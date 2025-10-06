/**
 * Validation utility functions for form inputs
 */

/**
 * Validates email format
 * @param email - Email string to validate
 * @returns true if valid email format
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validates credit card number format
 * @param cardNumber - Card number string (with or without spaces)
 * @returns true if valid card number format
 */
export const validateCardNumber = (cardNumber: string): boolean => {
  const cleanNumber = cardNumber.replace(/\s/g, '')
  return cleanNumber.length >= 13 && cleanNumber.length <= 19
}

/**
 * Validates expiration date format and ensures it's not expired
 * @param expiration - Expiration date in MM/YY format
 * @returns true if valid and not expired
 */
export const validateExpiration = (expiration: string): boolean => {
  const expRegex = /^(0[1-9]|1[0-2])\/\d{2}$/
  if (!expRegex.test(expiration)) return false
  
  const [month, year] = expiration.split('/')
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear() % 100
  const currentMonth = currentDate.getMonth() + 1
  
  const expYear = parseInt(year)
  const expMonth = parseInt(month)
  
  return expYear > currentYear || (expYear === currentYear && expMonth >= currentMonth)
}

/**
 * Validates CVC/CVV code
 * @param cvc - CVC code
 * @returns true if valid CVC format
 */
export const validateCvc = (cvc: string): boolean => {
  return cvc.length >= 3 && cvc.length <= 4 && /^\d+$/.test(cvc)
}

/**
 * Validates required field is not empty
 * @param value - Field value
 * @returns true if not empty
 */
export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0
}

/**
 * Validates ZIP code format (US)
 * @param zipCode - ZIP code string
 * @returns true if valid ZIP format
 */
export const validateZipCode = (zipCode: string): boolean => {
  return /^\d{5}(-\d{4})?$/.test(zipCode)
}

