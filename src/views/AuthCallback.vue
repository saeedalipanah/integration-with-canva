<template>
  <div>
    <h2>در حال پردازش ورود...</h2>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: null,
    }
  },
  async mounted() {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')

    if (!code) {
      this.error = 'کد احراز هویت دریافت نشد!'
      return
    }

    // مقدارهای واقعی خودتان را جایگزین کنید
    const client_id = 'OC-AZbnBvE3oLbV'
    const client_secret = 'cnvca9RovTJk8UIqtlJWIQQ6_2cpRZCjxPFxdvpB5gzkxBQI3df61135'
    const redirect_uri = 'YOUR_REGISTERED_REDIRECT_URI'
    const code_verifier = 'YOUR_CODE_VERIFIER' // این مقدار رو باید موقع شروع OAuth ساختید و نگه دارید

    // ساخت Base64 برای client_id:client_secret
    const credentials = btoa(`${client_id}:${client_secret}`)

    try {
      console.log({ code })
      const response = await fetch('https://api.canva.com/rest/v1/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${credentials}`,
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
        }),
      })

      if (!response.ok) throw new Error('خطا در تبادل توکن')

      const data = await response.json()
      const accessToken = data.access_token

      // ذخیره توکن در localStorage یا state مدیریت شده
      localStorage.setItem('canva_access_token', accessToken)

      this.$router.push('/return-navigation')
    } catch (err) {
      console.log({ err })
      this.error = err.message
    }
  },
}
</script>
