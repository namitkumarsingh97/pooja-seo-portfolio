# Frontend Integration Guide

## What Was Changed

✅ **Backend separated** - Moved to `final-portfolio-pooja-server` folder  
✅ **Frontend cleaned** - Removed `api/` folder (no longer needed)  
✅ **API service updated** - Frontend now uses `VITE_API_URL` environment variable  
✅ **CORS configured** - Backend ready to accept requests from your frontend  

## Next Steps

### 1. Deploy Your Backend

Deploy the backend from: `C:\Users\admim\Desktop\Namit.Singh\Projects\final-portfolio-pooja-seo\final-portfolio-pooja-server`

**If deploying to Vercel:**
- The `vercel.json` is already configured
- Set environment variables in Vercel dashboard (see `DEPLOYMENT.md` in backend folder)
- Deploy and get your backend URL (e.g., `https://pooja-api.vercel.app`)

### 2. Update Frontend Environment Variable

Once you have your backend URL, add it to your **frontend** Vercel project:

1. Go to Vercel Dashboard → Your Frontend Project → Settings → Environment Variables
2. Add new variable:
   - **Name**: `VITE_API_URL`
   - **Value**: Your backend URL (e.g., `https://pooja-api.vercel.app`)
   - **Environment**: Production, Preview, Development (select all)
3. **Important**: Do NOT include `/api` in the URL - the code handles that automatically
4. Redeploy your frontend

### 3. Update Backend CORS

In your backend deployment, make sure `CORS_ALLOW_ORIGINS` includes your frontend URL:
```
CORS_ALLOW_ORIGINS=https://pooja-seo-portfolio.vercel.app,http://localhost:5173
```

## File Locations

### Frontend (Current Location)
- `src/services/blogService.js` - Already configured to use `VITE_API_URL`
- All API calls will automatically use your backend URL once `VITE_API_URL` is set

### Backend (Separate Location)
- `C:\Users\admim\Desktop\Namit.Singh\Projects\final-portfolio-pooja-seo\final-portfolio-pooja-server`
- See `DEPLOYMENT.md` in that folder for deployment instructions

## Testing

After deployment:

1. **Test Backend**: Visit `https://your-backend-url/api/posts` - should return posts
2. **Test Frontend**: Visit your frontend - blog should load posts from backend
3. **Test Admin**: Login at `/admin` - should authenticate with backend

## Troubleshooting

- **404 Errors**: Make sure `VITE_API_URL` is set correctly (without `/api` suffix)
- **CORS Errors**: Check `CORS_ALLOW_ORIGINS` in backend includes your frontend URL
- **Network Errors**: Verify backend is deployed and accessible

