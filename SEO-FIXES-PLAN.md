# SEO Fixes Implementation Guide

## ✅ ANALYZED - Key Findings

### H1 Missing on Pages/Collections
**Status**: Configuration Issue (Not Code)
- **Code is Correct**: Both `main-page.liquid` (line 17) and `collection-banner.liquid` (line 70) have proper H1 tags
- **Issue**: The `show_title` or `show_collection_title` settings may be disabled in Shopify Admin

**How to Fix in Shopify Admin:**
1. Go to Online Store → Themes → Customize
2. For each affected page/collection:
   - Navigate to the page (e.g., /pages/contact-us)
   - Select the "Page" or "Collection banner" section
   - Enable "Show page title" or "Show collection title" checkbox
   - Save

**Affected Pages to Check:**
- /pages/shop-our-instagram → Enable "Show page title"
- /pages/what-our-customers-are-saying → Enable "Show page title"
- /pages/contact-us → Enable "Show page title"
- /pages/free-gift → Enable "Show page title"
- /pages/trade → Enable "Show page title"  
- /pages/partner-with-us → Enable "Show page title"
- /pages/how-to-hang-your-mirror → Enable "Show page title"
- /collections/best-sellers → Enable "Show collection title"
- /collections/spring-sale → Enable "Show collection title"
- /collections/new-in → Enable "Show collection title"

---

### H1 Multiple (3 pages)
**Affected Pages:**
- / (homepage)
- /pages/deliveries
- /pages/brand-story

**Action Required:**
1. Check homepage sections for multiple H1 elements
2. Change secondary H1s to H2s
3. Keep only ONE main H1 per page

---

## Code Fixes Applied

### 1. Launch/Restock Date Replacement ✅
**File**: `snippets/product-form.liquid`
- Line 798: Added `| replace: '[DATE]', launch_date` to display actual launch dates
- Line 802: Added `| replace: '[DATE]', restock_date` to display actual restock dates

---

## Issues Requiring Shopify Admin / App Configuration

### 1. Page Titles Outside <head> (2 pages)
- /pages/taskrabbit
- /pages/payment

**Possible Causes:**
- App injection (Klarna, payment apps)
- Custom code in theme/snippets
- Needs investigation in live site HTML

### 2. Hreflang Outside <head> (92 pages - 97.87%)
**Likely Cause**: Shopify Markets or localization app
**Fix**: 
- Check Shopify Markets configuration
- Contact Shopify Support if Markets-generated
- Check if any apps inject hreflang tags

### 3. Validation Issues (37 pages)
**Multiple <head> and <body> Tags**
- Likely Klarna plugin based on notes
- Check at line 502 in `layout/theme.liquid`
- May need to contact Klarna support or review their integration

---

## Manual Review Required

### Images: Missing Alt Text (105 images)
**Action**: Review images site-wide and add descriptive alt attributes
**Priority**: Medium (impacts accessibility and SEO)

### Links: Non-Descriptive Anchor Text (35 pages)
**Action**: Replace generic text with descriptive phrases
**Examples:**
- ❌ "Click here" → ✅ "View full size guide"
- ❌ "Learn more" → ✅ "Discover mirror care tips"

### Images: Over 100 KB (828 images - 56.52%)
**Action**: Optimize images for web
**Tools**: TinyPNG, Shopify image optimization, WebP format

---

## Quick Action Checklist

- [ ] Enable H1 titles for 10 pages/collections in Shopify Admin
- [ ] Fix multiple H1s on homepage, deliveries, brand-story pages
- [ ] Review and fix 105 images missing alt text
- [ ] Replace 35 instances of non-descriptive anchor text
- [ ] Investigate taskrabbit & payment page title issues
- [ ] Check Klarna integration for validation issues
- [ ] Review Shopify Markets for hreflang configuration
- [ ] Optimize 828 images over 100 KB

---

## Files Modified

1. `snippets/product-form.liquid` - Launch/restock date replacement
2. `SEO-FIXES-PLAN.md` - This documentation

## Files Referenced (No Changes Needed)

1. `sections/main-page.liquid` - Line 17: H1 for pages (code is correct)
2. `sections/collection-banner.liquid` - Line 70: H1 for collections (code is correct)
3. `layout/theme.liquid` - Line 502: Klarna script location

---

**Note**: Most H1 issues are configuration-based in Shopify Admin, not code issues. The theme code is structurally sound for SEO.
