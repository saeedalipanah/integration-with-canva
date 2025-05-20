<template>
  <div>
    <h2>بازگشت از Canva</h2>
    <p v-if="error">{{ error }}</p>
    <div v-if="designUrl">
      <h3>طرح شما:</h3>
      <img :src="designUrl" alt="طرح Canva" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: null,
      designUrl: null,
    }
  },
  async mounted() {
    const urlParams = new URLSearchParams(window.location.search)
    const designId = urlParams.get('designId')

    if (!designId) {
      this.error = 'شناسه طرح دریافت نشد!'
      return
    }

    try {
      const accessToken = localStorage.getItem('canva_access_token')
      if (!accessToken) throw new Error('توکن دسترسی یافت نشد!')

      // درخواست دریافت لینک تصویر طرح از سرور (API سرور خودت)
      const response = await fetch(`/api/canva/get-design?designId=${designId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })

      if (!response.ok) throw new Error('خطا در دریافت طرح')

      const data = await response.json()
      this.designUrl = data.image_url // آدرس تصویر نهایی طرح
    } catch (err) {
      this.error = err.message
    }
  },
}
</script>
