# I don't need a readme there.


## Notes
带备案信息调试与编译
```json
"scripts": {
    "dev": "cross-env PUBLIC_BASE_URL='/' BEIAN='京ICP备xxxxxxxxxx号' astro dev",
    "build": "cross-env PUBLIC_BASE_URL='/' BEIAN='京ICP备xxxxxxxxxx号' astro build",
	...
}
```
