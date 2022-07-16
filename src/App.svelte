<script lang="ts">
  import cantoLogo from "./assets/logo.svg";
  import { form, field } from "svelte-forms";
  import { required } from "svelte-forms/validators";
  import Airtable from "airtable";
  import sha256 from "crypto-js/sha256";
  import { addTestnetToMetamask, addTokens } from "./assets/tokens";

  const name = field("twitter_handle", "", [required()]);
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
    if (myForm.summary().twitter_handle && myForm.summary().wallet_address) {
      //generating hash
      hashedValue = sha256(
        myForm.summary().twitter_handle + myForm.summary().wallet_address
      );
      const placeholder =
        "https://twitter.com/intent/tweet?text=I%20am%20an%20early%20settler%20of%20%40CantoPublic.%20Verification%3A%20";
      window.open(placeholder + hashedValue + "%0A%20settlers.canto.io", "_blank");
    }
  }

  async function validateHash(): Promise<boolean> {
    await myForm.validate();
    await validate.validate();
    if (myForm.summary().twitter_handle && myForm.summary().wallet_address) {
      hashedValue = sha256(
        myForm.summary().twitter_handle + myForm.summary().wallet_address
      );
      let id = (await validate.validate()).value;

      id = id.toLowerCase();

      // console.log("NAME: ", myForm.summary().twitter_handle);
      console.log("ID: ", id);

      let handle;

      if (myForm.summary().twitter_handle.toLowerCase()[0] == '@') {
        handle = myForm.summary().twitter_handle.toLowerCase().slice(1);
        console.log("HANDLE: ", handle);
      } else {
        handle = myForm.summary().twitter_handle.toLowerCase();
      }

      console.log(handle);

      if (id.includes("https://twitter.com/" + handle)) {
        return true;
      }

      else if (id.includes("https://mobile.twitter.com/" + handle)) {
        return true;
      }


      return false;

      // const value = await getTweet(id.split("/")[5]);

      // console.log(value);

      // if (hashedValue.toString().length > 5) {
      //   console.log(value.data[0].text.includes('https://twitter.com'));
      //   return value.data[0].text.includes('https://twitter.com');
      //   return true;
      //   return value.data[0].text.includes(hashedValue.toString());
      // }
      // else return false;
    }
    return false;
  }

  async function getTweet(id: string) {
    const options = {
      method: "GET",
      headers: {
        Origin: "",
        Authorization: "Bearer " + import.meta.env.VITE_TWITTER_TOKEN,
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
      if (
        myForm.summary().twitter_handle &&
        myForm.summary().wallet_address &&
        verified
      ) {
        loading = true;

        base("Testers").create(
          [
            {
              fields: {
                "Pseudo Name": myForm.summary().twitter_handle,
                "Wallet Address": myForm.summary().wallet_address,
                Verified: verified,
                Tweet: myForm.summary().verification_url,
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
      isNotMatch = false;
    }
  }
</script>

<main>
  <img
    src={cantoLogo}
    height={40}
    alt="canto logo"
    style="margin-right : 1rem"
  />
  <h1 style="margin-bottom : 2rem">Settlers of Canto</h1>
  <p style="text-align: left;">
    Settlers of Canto is a dress rehearsal for the Canto launch. In
    this walkthrough, you will have the chance to use Canto’s Free Public
    Infrastructure, including the Canto Dex LP and Canto Lending Market, for the very first time. Settling
    starts on July 16 at 11AM CST.<br
    /><br />
    <p style="text-align: left;">
      Read more about Canto's full launch schedule <a style="color: white" href="https://mirror.xyz/0x4CeD9817cAD891aEFfbF5Fb7DcB6f3c6aEBd4228/kSrSQcHROw41HlS0M3YU_Yj1ljRarGXChrKbE0Z7BJc">here</a><br
      /><br />

    <br />
    <br />
    <span style="font-weight: 600;">
      The goals of Settlers are as follows:
    </span>
  </p>
  <ul style="text-align: left">
    <li style="margin: 10px 30px;">
      Fill out the form below to register and claim your testnet tokens 
    </li>
    <li style="margin: 10px 30px;">
      Follow <a href="https://twitter.com/CantoPublic" style="color: white">@CantoPublic</a> on Twitter 
    </li>
    <li style="margin: 10px 30px;">Join <a href="https://t.me/+1I1JgueMSbU2NjRh" style="color: white">Telegram</a> group</li>
    <li style="margin: 10px 30px;">Provide liquidity to the Canto DEX</li>
    <li style="margin: 10px 30px;">Supply LP tokens in the Canto Lending Market</li>
    <li style="margin: 10px 30px;">
      Report bugs and design changes in Telegram to help us improve the overall experience for all Canto users
    </li>
  </ul>

  <br>
  <br>
  <span style="font-weight: 600;">
    If verified, please check your wallet for tokens at 11AM CST. The links
    below will also be updated at that time.
  </span>

  <p style="text-align: left;">
    <br />
    Testnet RPC url:
    <br />

    Chain ID:
    <br />

    Canto Lending Market url:
    <br />

    DEX url:
    <br />
    <br />
  </p>

  <button
    on:click={async () => {
      await addTestnetToMetamask();
      // await addTokens();
    }}>Click to add testnet to metamask</button
  >
  <br />
  <br />
  <p style="text-align: center;">We appreciate your early support.</p>

  <section class="form">
    <div class="errors">
      {#if $myForm.hasError("twitter_handle.required")}
        <p>Please enter a twitter handle.</p>
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
    Please do not change twitter handle and wallet address after generating verification tweet. 
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
      >{loading
        ? "Sending Form"
        : success
        ? "Sent Successfully!"
        : "Submit"}</button
    >
  </section>
</main>

<style>
</style>
