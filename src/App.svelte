<script lang="ts">
  import cantoLogo from "./assets/logo.svg";
  import { form, field } from "svelte-forms";
  import { required } from "svelte-forms/validators";
  import Airtable from "airtable";
  import sha256 from "crypto-js/sha256";
  
  const name = field("psuedo_name", "", [required()]);
  const address = field("wallet_address", "", [required()]);
  const validate = field("verifcation_url", "", [required()]);
  const myForm = form(name, address, validate);
  let hashedValue = "";
  var base = new Airtable({ apiKey: import.meta.env.VITE_AIRTABLE_KEY }).base(
    import.meta.env.VITE_AIRTABLE_BASE
  );

  async function sendTweetAndHash() {
    await myForm.validate();
    //checking if both fields exist
    if (myForm.summary().psuedo_name && myForm.summary().wallet_address) {
      //generating hash
      hashedValue = sha256(
        myForm.summary().psuedo_name + myForm.summary().wallet_address
      );
      const placeholder =
        "https://twitter.com/intent/tweet?text=something%20that%27s%20going%20on%20sig%3A%20";
      window.open(placeholder + hashedValue + "&hashtags=canto", "_blank");
    }
  }

  async function validateHash(): Promise<boolean> {
    await myForm.validate();
    await validate.validate()
    if (myForm.summary().psuedo_name && myForm.summary().wallet_address) {
      hashedValue = sha256(
        myForm.summary().psuedo_name + myForm.summary().wallet_address
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
  async function saving() {
    try {
      await myForm.validate();
      const verified = await validateHash();
      status = "Invalid Date"
      if (myForm.summary().psuedo_name && myForm.summary().wallet_address && verified) {
    loading = true;

        base("Testers").create(
          [
            {
              fields: {
                "Pseudo Name": myForm.summary().psuedo_name,
                "Wallet Address": myForm.summary().wallet_address,
                "Verified": verified,
                "Tweet" : myForm.summary().verifcation_url
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
    />the game of canto
  </h1>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum aliquid modi
    impedit, accusamus adipisci aperiam culpa vitae quaerat explicabo
    exercitationem esse repellat neque vel fugiat quae iste ipsum. Iste, velit?
  </p>
  <section class="form">
    <div class="errors">
      {#if $myForm.hasError("psuedo_name.required")}
        <p>we requrie a psuedo name.</p>
      {/if}
      {#if $myForm.hasError("wallet_address.required")}
        <p>we need a valid walletAddress.</p>
      {/if}
      {#if $myForm.hasError("verifcation_url.required")}
        <p>please enter the tweet url for verification</p>
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
      Tweet</button
    >
    <div class="field">
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
      >{loading ? "Sending Form" : success ? "Sent Successfully" : "Send Form"}</button
    >
  </section>
</main>

<style>
</style>
