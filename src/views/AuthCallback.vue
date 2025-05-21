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

    try {
      console.log({ code })
      const response = await fetch('https://api.canva.com/rest/v1/oauth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(`code=${code}`),
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
