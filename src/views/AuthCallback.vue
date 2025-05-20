<template>
  <div>
    <h1>helllllllllllllllllllllllllllllllllllo</h1>
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

    try {
      // اینجا باید با سرور خودت تبادل توکن کنی
      // برای نمونه، فرض می‌کنیم سرور API ای دارد که توکن را می‌گیرد و دسترسی می‌دهد

      // نمونه درخواست به سرور (آدرس و روش را با سرورت هماهنگ کن)
      console.log({ code })
      const response = await fetch('https://api.canva.com/rest/v1/oauth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(`grant_type=${code}&code=${code}`),
      })

      if (!response.ok) throw new Error('خطا در تبادل توکن')

      const data = await response.json()
      const accessToken = data.access_token

      // ذخیره توکن در localStorage یا state مدیریت شده
      localStorage.setItem('canva_access_token', accessToken)

      // هدایت به صفحه طراحی یا Return Navigation
      this.$router.push('/return-navigation')
    } catch (err) {
      console.log({ err })
      this.error = err.message
    }
  },
}
</script>
