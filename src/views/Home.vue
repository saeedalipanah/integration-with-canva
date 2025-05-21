<template>
  <div>
    <h1>شروع طراحی با Canva</h1>
    <button @click="startCanva">ویرایش با Canva</button>
  </div>
  <RouterLink to="/return-navigation">return navigation</RouterLink>-------------
  <RouterLink to="/auth-callback">auth callback</RouterLink>
</template>
<script setup lang="ts">
function base64UrlEncode(buffer: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

async function sha256(plain: string): Promise<ArrayBuffer> {
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)
  return await crypto.subtle.digest('SHA-256', data)
}

function generateCodeVerifier(length = 128): string {
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  return base64UrlEncode(array.buffer)
}

async function generateCodeChallenge(codeVerifier: string): Promise<string> {
  const hashed = await sha256(codeVerifier)
  return base64UrlEncode(hashed)
}
const startCanva = async () => {
  const codeVerifier = generateCodeVerifier()
  const codeChallenge = await generateCodeChallenge(codeVerifier)
  console.log({ codeVerifier, codeChallenge })

  const clientId = 'OC-AZbnBvE3oLbV'
  const redirectUri = encodeURIComponent('https://integration-with-canva.vercel.app/auth-callback')
  const scope = encodeURIComponent(
    'app:read app:write design:meta:read folder:write design:content:write design:permission:read design:permission:write comment:read folder:permission:read folder:permission:write profile:read comment:write design:content:read folder:read brandtemplate:meta:read brandtemplate:content:read asset:read asset:write',
  )
  const canvaUrl = `https://www.canva.com/api/oauth/authorize?code_challenge_method=s256&response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&code_challenge=${codeChallenge}`

  console.log({ canvaUrl })
  localStorage.setItem('canva_code_verifier', codeVerifier)
  window.location.href = canvaUrl
}
</script>
