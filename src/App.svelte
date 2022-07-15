<script lang="ts">
  import cantoLogo from "./assets/logo.svg";
  import { form, field } from "svelte-forms";
  import { required } from "svelte-forms/validators";
  import Airtable from "airtable";
  import sha256 from "crypto-js/sha256";
  
  const name = field("pseudonym", "", [required()]);
  const address = field("wallet_address", "", [required()]);
  const validate = field("verification_url", "", [required()]);
  const myForm = form(name, address, validate);
  let hashedValue = "";
  var base = new Airtable({ apiKey: import.meta.env.VITE_AIRTABLE_KEY }).base(
    import.meta.env.VITE_AIRTABLE_BASE
  );

  async function sendTweetAndHash() {
    await myForm.validate();
    //checking if both fields exist
    if (myForm.summary().pseudonym && myForm.summary().wallet_address) {
      //generating hash
      hashedValue = sha256(
        myForm.summary().pseudonym + myForm.summary().wallet_address
      );
      const placeholder =
        "https://twitter.com/intent/tweet?text=I%20am%20an%20early%20settler%20of%20Canto%20%40CantoPublic.%20Verification%3A%20";
      window.open(placeholder + hashedValue + "&hashtags=canto", "_blank");
    }
  }

  async function validateHash(): Promise<boolean> {
    await myForm.validate();
    await validate.validate()
    if (myForm.summary().pseudonym && myForm.summary().wallet_address) {
      hashedValue = sha256(
        myForm.summary().pseudonym + myForm.summary().wallet_address
      );
      const id = (await validate.validate()).value;

      const value = await getTweet(id.split("/")[5]);
     
      if (hashedValue.toString().length > 5)
        return value.data[0].text.includes(hashedValue.toString());
      else return false;
    }
    return false;
  }

 

  async function getTweet(id: string) {
    const options = {
      method: "GET",
      headers: {
        Origin: "",
        Authorization:
          "Bearer "+ import.meta.env.VITE_TWITTER_TOKEN,
      },
    };
    const data = await fetch(
      "https://canto-proxy.herokuapp.com/https://api.twitter.com/2/tweets?ids=" +
        id,
      options
    );

    return await data.json();
  }


  let loading = false;
  let success = false;
  let status = "Send Form";
  let isNotMatch = false;
  async function saving() {
    try {
      await myForm.validate();
      const verified = await validateHash();
      isNotMatch = !verified;
      if (myForm.summary().pseudonym && myForm.summary().wallet_address && verified) {
    loading = true;

        base("Testers").create(
          [
            {
              fields: {
                "Pseudo Name": myForm.summary().pseudonym,
                "Wallet Address": myForm.summary().wallet_address,
                "Verified": verified,
                "Tweet" : myForm.summary().verification_url
              },
            },
          ],
          function (err, records) {
            if (err) {
              console.error(err);
              loading = false;
              return;
            }
            records.forEach(function (record) {
              loading = false;
              success = true;
              console.log(record.getId());
            });
          }
        );
      }
    } catch (error) {
      loading = false;
      isNotMatch = true;
    }
  }
</script>

<main>
  <h1 style="margin-bottom : 2rem">
    <img
      src={cantoLogo}
      height={40}
      alt="canto logo"
      style="margin-right : 1rem"
    />the settlers of canto
  </h1>
  <p style="text-align: left;">
    Welcome to Canto. The Canto Movement is an experiment to return to the principles of an open, free, and community-driven ecosystem.
     To participate in the testnet, please provide the info below.<br><br>
<span style="font-weight: 600;">
If verified, please check your wallet for tokens at 9AM EST, and go crazy.

</span>
  </p>
  <p style="text-align: left;">
    <br>
Testnet RPC url:
<br>

Chain ID:
<br>

Canto Lending Market url:
<br>

DEX url:
<br>
<br>

  </p>

  <p style="text-align: center;">
We appreciate your early support.

  </p>
  <section class="form">
    <div class="errors">
      {#if $myForm.hasError("pseudonym.required")}
        <p>Please enter a psuedo name.</p>
      {/if}
      {#if $myForm.hasError("wallet_address.required")}
        <p>Please enter a wallet address.</p>
      {/if}
      {#if $myForm.hasError("verification_url.required")}
        <p>Please enter the tweet url for verification.</p>
      {/if}
      {#if isNotMatch}
      <p>Please enter a valid verification url.</p>
      {/if}
    </div>
    <div class="field">
      <label for="psuedoName">{$name.name}</label>
      <input
        required
        type="text"
        placeholder="ninja"
        bind:value={$name.value}
        name="psuedoName"
        autocomplete="off"
        id="psuedoName"
      />
    </div>

    <div class="field">
      <label for="walletAddress">{$address.name}</label>
      <input
        type="text"
        placeholder="0xEE4....890"
        bind:value={$address.value}
        name="walletAddress"
        autocomplete="off"
        spellcheck="false"
        id="walletAddress"
      />
    </div>
    <button
      on:click={sendTweetAndHash}
      class="twitter-share-button"
      data-size="large"
    >
      Generate verification tweet</button
    >
    <div class="field" style="margin-top: 2rem;">
      <label for="validate">{$validate.name}</label>
      <input
        type="text"
        placeholder="https:// of the tweet"
        bind:value={$validate.value}
        name="validate"
        autocomplete="off"
        spellcheck="false"
        id="validate"
      />
    </div>
    <button disabled={!$myForm.valid} on:click={saving}
      >{loading ? "Sending Form" : success ? "Sent Successfully" : "Submit"}</button
    >
  </section>
</main>

<style>
</style>
