import requests

headers = {
    'User-Agent': 'CausalSEO/1.0 (structural SEO analysis; contact via site)',
    'Accept': 'text/html,application/xhtml+xml',
}
resp = requests.get('https://YOUR-PAGE-URL', headers=headers, timeout=10)
print('Content-Type:', resp.headers.get('content-type',''))
if '__NEXT_DATA__' in resp.text: print('Next.js detected')
elif 'data-reactroot' in resp.text: print('React detected')
elif 'data-v-' in resp.text: print('Vue detected')
else: print('Server-rendered HTML')
links = [l[:80] for l in resp.text.split('<a ') if 'href' in l][1:8]
for l in links: print(l)
