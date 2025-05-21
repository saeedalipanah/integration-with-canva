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
    console.log('mounted')
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')

    if (!code) {
      this.error = 'کد احراز هویت دریافت نشد!'
      return
    }

    // مقدارهای واقعی خودتان را جایگزین کنید
    const client_id = 'OC-AZbnBvE3oLbV'
    const client_secret = 'cnvcaycSSQ3rnR36MIXpKoXTcBaWS9mP2BnJC_9vNNl0qeXUef0de549'

    const codeVerifier = localStorage.getItem('canva_code_verifier')
    console.log({ codeVerifier })

    // ساخت Base64 برای client_id:client_secret
    const credentials = btoa(`${client_id}:${client_secret}`)

    try {
      const response = await fetch('https://api.canva.com/rest/v1/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          code_verifier: codeVerifier,
          client_id: client_id,
          client_secret: client_secret,
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
