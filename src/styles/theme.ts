// theme.js
import { extendTheme } from '@chakra-ui/react'

// Version 1: Using objects
export const theme = extendTheme({
  colors: {
    backgroundDark: '#F3F3F6',
  },
  styles: {
    global: {
      body: {
        bg: '#F3F3F6',
        color: 'black'
      }
    }
  }
})
