/* oxlint-disable */

// PLACEHOLDER DO NOT REFERENCE UNTIL EXPLICITELY ASKED

const typography = Stylesheet.create((theme) => ({
    base: {
        fontFamily: 'System',
        fontSize: theme.font.size['native-7'],
        fontWeight: 'normal',
        _web: {
            fontFamily: '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            fontSize: theme.font.size['web-7'],
        }
    },
    
    heading: {
         fontWeight: '600',
         fontFamily: 'System',
         variants: {
             level: {
                 1: {
                     fontSize: theme.font.size['native-12'],
                     fontWeight: '800',
                     letterSpacing: -4
                 }
             }
         }
    }
}))