# 👤 Request New Account Button - Concept Plan

## 📋 **What This Component Should Be**

The **Request New Account Button** is a secondary button that helps users who need a new account or access to the system. It should look similar to the Forgot Credentials button but with different text and icon.

## 🎯 **What It Should Do**

- **Help Users:** Provide assistance for users who need a new account
- **Open Modal:** Clicking the button should open the Request Account Modal
- **Look Professional:** Match the overall app design while being clearly secondary
- **Be Accessible:** Easy to see and use on all devices

## 🎨 **How It Should Look**

### **Button Styling**
- **Text:** "Request New Account"
- **Background:** White background (#ffffff)
- **Border:** Purple border (#6c5ce7) - our main brand color
- **Text Color:** Purple text (#6c5ce7) - same as border
- **Height:** 48px (same height as other buttons)
- **Width:** Full width of the container
- **Corners:** Rounded edges (12px radius)

### **Icon**
- **Icon Type:** User with plus sign icon (UserPlus)
- **Position:** Left side of the text
- **Size:** Appropriate size to match the text
- **Color:** Purple (#6c5ce7) - same as text and border

### **Button States**
- **Normal State:** White background, purple border and text
- **Hover State:** Slightly darker purple border and text
- **Active State:** When clicked, shows pressed effect
- **Focus State:** Clear focus indicator for keyboard navigation

## 🔧 **How It Should Work**

### **Button Behavior**
- **Click Action:** Opens the Request Account Modal
- **Modal Trigger:** Sends signal to parent component to show modal
- **State Management:** Parent component controls when modal is visible

### **Accessibility**
- **Keyboard Navigation:** Can be reached with Tab key
- **Screen Readers:** Clear description of what the button does
- **Focus Indicator:** Visible focus state for keyboard users

## 📱 **How It Should Work on Different Devices**

### **Mobile Phones**
- **Touch Friendly:** Easy to tap with fingers
- **Size:** 48px height is comfortable for mobile
- **Spacing:** Good spacing from other elements

### **Tablets**
- **Touch Friendly:** Easy to use with touch
- **Appearance:** Professional and balanced

### **Desktop Computers**
- **Mouse Friendly:** Easy to click with mouse
- **Hover Effects:** Subtle hover state changes
- **Keyboard Navigation:** Works well with keyboard

## 📋 **Component Props (What It Accepts)**

### **Required Props**
```typescript
onClick: () => void
```
- **onClick:** Function to call when button is clicked
- **Purpose:** Tells parent component to show the modal

### **Optional Props**
```typescript
disabled?: boolean
className?: string
```
- **disabled:** Whether button should be disabled (default: false)
- **className:** Additional CSS classes for custom styling

## 🎯 **Usage Examples**

### **Basic Usage**
```typescript
<RequestAccountButton onClick={() => setShowRequestModal(true)} />
```
- Shows the button with default styling
- Opens modal when clicked

### **With Custom Styling**
```typescript
<RequestAccountButton 
  onClick={() => setShowRequestModal(true)}
  className="mt-2"
/>
```
- Adds custom margin-top spacing
- Maintains all default functionality

### **Disabled State**
```typescript
<RequestAccountButton 
  onClick={() => setShowRequestModal(true)}
  disabled={isLoading}
/>
```
- Button becomes disabled during loading
- Prevents multiple clicks

## ✅ **Success Criteria - How to Know It's Working**

### **Visual Check**
- ✅ Button appears as white with purple border and text
- ✅ UserPlus icon shows on the left side
- ✅ Button is 48px tall with rounded corners
- ✅ Full width of the container
- ✅ Text reads "Request New Account"

### **Functional Check**
- ✅ Clicking button triggers onClick function
- ✅ Button responds to hover and focus states
- ✅ Icon is visible and properly positioned
- ✅ Button works on all devices

### **User Experience Check**
- ✅ Easy to see and understand
- ✅ Clear that it's for requesting access
- ✅ Accessible for all users
- ✅ Professional appearance

## 🔄 **What Happens When Things Change**

### **Button Click**
- **User Clicks:** Button shows pressed effect
- **onClick Triggered:** Parent component receives signal
- **Modal Opens:** Request Account Modal appears

### **State Changes**
- **Normal to Hover:** Border and text become slightly darker
- **Hover to Active:** Shows pressed effect
- **Focus State:** Clear focus indicator appears

## 📝 **Important Notes for Our Team**

- **Think About Users:** Healthcare workers need easy access to account requests
- **Secondary Button:** Should look different from main login button
- **Clear Purpose:** Users should immediately understand what it does
- **Accessibility:** Make sure everyone can use it
- **Professional Look:** Should match our healthcare app design

## 🚀 **Future Enhancements**

Later, we might want to add:
- **Tooltip:** Hover tooltip explaining the process
- **Animation:** Subtle entrance animation
- **Loading State:** Show loading when modal is opening
- **Analytics:** Track how often users request accounts

---

## 🎉 **Final Result**

**The Request New Account Button should:**
- **Look Professional:** White background with purple border and text
- **Be Clear:** Users immediately understand it's for requesting access
- **Work Perfectly:** Opens modal when clicked
- **Be Accessible:** Easy to use for everyone
- **Match Design:** Consistent with our app styling

**This button is crucial for helping users get system access!** 🚀💜🏥
