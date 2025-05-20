<template>
  <div>
    <h1>شروع طراحی با Canva</h1>
    <button @click="startCanva">ویرایش با Canva</button>
  </div>
</template>

<script>
import crypto from 'crypto'
export default {
  methods: {
    startCanva() {
      console.log(crypto)
      // const codeVerifier = crypto.randomBytes(96).toString('base64url')
      // const codeChallenge = crypto.createHash('sha256').update(codeVerifier).digest('base64url')
      const clientId = 'OC-AZbnBvE3oLbV' // کلاینت آیدی از کانوا
      const redirectUri = window.location.origin + '/auth-callback'

      // const canvaUrl = `https://www.canva.com/api/oauth/authorize?code_challenge=<code challenge string>&code_challenge_method=s256&scope=<list of scopes>&response_type=code&client_id=${clientId}&state=<optional state>&redirect_uri=${redirectUri}`
      const canvaUrl = `https://www.canva.com/api/oauth/authorize?code_challenge_method=s256&response_type=code&client_id=OC-AZbnBvE3oLbV&redirect_uri=https%3A%2F%2Fintegration-with-canva.vercel.app%2Fauth-callback&scope=app:read%20app:write%20design:meta:read%20folder:write%20design:content:write%20design:permission:read%20design:permission:write%20comment:read%20folder:permission:read%20folder:permission:write%20profile:read%20comment:write%20design:content:read%20folder:read%20brandtemplate:meta:read%20brandtemplate:content:read%20asset:read%20asset:write&code_challenge=<CODE_CHALLENGE>`

      window.location.href = canvaUrl
    },
  },
}
</script>
