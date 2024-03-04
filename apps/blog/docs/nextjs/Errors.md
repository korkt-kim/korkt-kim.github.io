# Errors

## Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with "use server"

## Server Functions cannot be called during initial render. This would create a fetch waterfall. Try to use a Server Component to pass data to Client Components instead.

- data를 fetch 하는 'server component'는 'server-only'와 똑같다
