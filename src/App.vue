<template>
  <div>
    <h1>شروع طراحی با Canva</h1>
    <button @click="startCanva">ویرایش با Canva</button>
  </div>
</template>

<script>
export default {
  methods: {
    startCanva() {
      const clientId = 'OC-AZbnBvE3oLbV' // کلاینت آیدی از کانوا
      const redirectUri = encodeURIComponent(window.location.origin + '/auth-callback')

      const canvaUrl = `https://www.canva.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=designs.read+designs.write`

      window.location.href = canvaUrl
    },
  },
}
</script>
