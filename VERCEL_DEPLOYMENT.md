# Vercel Deployment Guide for FHESafe Exams

This guide provides step-by-step instructions for deploying the FHESafe Exams platform to Vercel.

## Prerequisites

- GitHub account with access to the `datawhaleAI/fhesafe-exams` repository
- Vercel account (free tier available)
- Environment variables configured

## Step-by-Step Deployment Process

### Step 1: Access Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project" on the dashboard

### Step 2: Import GitHub Repository

1. In the "Import Git Repository" section, search for `datawhaleAI/fhesafe-exams`
2. Click "Import" next to the repository
3. Wait for Vercel to detect the project

### Step 3: Configure Project Settings

#### Framework Preset
- **Framework Preset**: Select "Vite" from the dropdown
- Vercel should auto-detect this based on the `vite.config.ts` file

#### Build Settings
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### Root Directory
- Leave as default (root of the repository)

#### SPA Routing Configuration
**Important**: This project includes a `vercel.json` file that configures:
- **SPA Routing**: All routes redirect to `index.html` for React Router compatibility
- **CORS Headers**: Proper headers for API calls
- **Function Runtime**: Node.js 18.x for optimal performance

This ensures that direct links to routes like `/dashboard` work correctly.

### Step 4: Configure Environment Variables

Click "Environment Variables" and add the following variables:

```env
# Chain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY

# Wallet Connect Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID

# Infura Configuration
NEXT_PUBLIC_INFURA_API_KEY=YOUR_INFURA_API_KEY
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia

# Contract Configuration
NEXT_PUBLIC_CONTRACT_ADDRESS=YOUR_DEPLOYED_CONTRACT_ADDRESS
```

**Important**: 
- Add each variable individually
- Make sure to select "Production", "Preview", and "Development" environments for each variable
- Use the exact variable names as shown above

### Step 5: Advanced Configuration (Optional)

#### Custom Domain (Optional)
1. Go to "Domains" tab after deployment
2. Add your custom domain if you have one
3. Follow Vercel's DNS configuration instructions

#### Build Optimization
- **Node.js Version**: 18.x (recommended)
- **Build Cache**: Enable for faster subsequent builds

### Step 6: Deploy the Application

1. Review all settings in the "Deploy" section
2. Click "Deploy" button
3. Wait for the build process to complete (usually 2-5 minutes)

### Step 7: Verify Deployment

1. Once deployment is complete, you'll receive a URL like `https://fhesafe-exams-xxx.vercel.app`
2. Click the URL to test the application
3. Verify the following:
   - Page loads correctly
   - Wallet connection works
   - Environment variables are properly loaded
   - No console errors in browser developer tools

## Post-Deployment Configuration

### Step 8: Update Smart Contract Address (If Needed)

If you deploy a new smart contract:

1. Go to your Vercel project dashboard
2. Navigate to "Settings" → "Environment Variables"
3. Update `NEXT_PUBLIC_CONTRACT_ADDRESS` with the new contract address
4. Redeploy the application

### Step 9: Configure Automatic Deployments

1. Go to "Settings" → "Git"
2. Ensure "Automatic deployments" is enabled
3. Configure branch settings:
   - **Production Branch**: `main`
   - **Preview Branches**: All other branches

### Step 10: Monitor and Maintain

#### Performance Monitoring
- Check Vercel Analytics for performance metrics
- Monitor build logs for any issues
- Set up alerts for failed deployments

#### Security Considerations
- Regularly update dependencies
- Monitor for security vulnerabilities
- Keep environment variables secure

## Troubleshooting Common Issues

### Build Failures

**Issue**: Build fails with dependency errors
**Solution**: 
1. Check `package.json` for correct dependencies
2. Ensure `package-lock.json` is committed
3. Try clearing Vercel's build cache

**Issue**: Environment variables not loading
**Solution**:
1. Verify variable names match exactly (case-sensitive)
2. Ensure variables are added to all environments
3. Redeploy after adding new variables

### Runtime Issues

**Issue**: Wallet connection not working
**Solution**:
1. Verify `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` is correct
2. Check that the project ID is active on WalletConnect
3. Ensure RPC URLs are accessible

**Issue**: Contract interactions failing
**Solution**:
1. Verify contract address is correct
2. Check that contract is deployed on Sepolia testnet
3. Ensure user has Sepolia ETH for gas fees

## Environment-Specific Configurations

### Development Environment
- Use local development URLs
- Enable debug logging
- Use test contract addresses

### Production Environment
- Use production RPC endpoints
- Disable debug logging
- Use verified contract addresses
- Enable analytics and monitoring

## Security Best Practices

1. **Environment Variables**: Never commit sensitive keys to the repository
2. **HTTPS**: Vercel automatically provides HTTPS certificates
3. **CORS**: Configure CORS settings for API endpoints
4. **Rate Limiting**: Implement rate limiting for API calls
5. **Monitoring**: Set up error tracking and performance monitoring

## Troubleshooting

### Common Issues

#### 404 Errors on Direct Routes
**Problem**: Getting 404 errors when accessing routes like `/dashboard` directly.

**Solution**: 
1. Ensure `vercel.json` file is present in your project root
2. Verify the file contains the SPA routing configuration:
   ```json
   {
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```
3. Redeploy the application after adding the configuration

#### Build Failures
- **Node.js Version**: Ensure you're using Node.js 18+
- **Dependencies**: Run `npm install` locally to check for dependency issues
- **Environment Variables**: Verify all required variables are set

#### Runtime Errors
- **Console Errors**: Check browser developer tools for JavaScript errors
- **Network Issues**: Verify RPC URLs and API keys are correct
- **Wallet Connection**: Ensure WalletConnect Project ID is valid

#### Performance Issues
- **Bundle Size**: Consider code splitting for large applications
- **Image Optimization**: Use WebP format for better performance
- **Caching**: Enable Vercel's edge caching for static assets

## Performance Optimization

1. **Build Optimization**: Use Vite's build optimizations
2. **Caching**: Leverage Vercel's edge caching
3. **CDN**: Vercel automatically provides global CDN
4. **Image Optimization**: Use Vercel's image optimization features

## Backup and Recovery

1. **Code Backup**: Repository is automatically backed up on GitHub
2. **Environment Variables**: Export and backup environment variables
3. **Database**: If using external databases, ensure proper backups
4. **Deployment History**: Vercel maintains deployment history

## Cost Management

### Free Tier Limits
- 100GB bandwidth per month
- 100 serverless function executions per day
- 1,000 build minutes per month

### Upgrade Considerations
- Monitor usage in Vercel dashboard
- Upgrade to Pro plan if needed
- Consider custom domains and advanced features

## Support and Resources

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **GitHub Repository**: [github.com/datawhaleAI/fhesafe-exams](https://github.com/datawhaleAI/fhesafe-exams)
- **Project Issues**: Create issues in the GitHub repository
- **Community Support**: Vercel Discord and GitHub Discussions

---

**Deployment Checklist**:
- [ ] Repository imported to Vercel
- [ ] Framework preset set to Vite
- [ ] Build settings configured
- [ ] Environment variables added
- [ ] Initial deployment successful
- [ ] Application tested and working
- [ ] Automatic deployments enabled
- [ ] Monitoring and alerts configured

**Last Updated**: January 2025
**Version**: 1.0.0
