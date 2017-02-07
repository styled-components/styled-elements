# 1.0.7 -- anti-xss prevention

1. All key injected chars are now escaped (i.e. `<`, `>`, `&`, '"', "'")
   - Note, while this does make injection less usable, it prevents a huge XSS attack vector

# 1.0.6 -- fix exports

1. Fix exports

# 1.0.5 -- themes, css, injectGlobal

1. themes via (setTheme), makes globally available in state
2. css function now available
3. injectGlobal for global css injection

# 1.0.1 -- keyframes and optional double method notation

1. Supports @keyframes now via styled.keyframes
2. Optional double function notation (i.e. `Box()()` == `Box()`)

# 1.0.0 -- styled-elements

1. Basic testing
2. Basic docs
3. License
4. linting
5. basic exports
