import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher(['/'])

export default clerkMiddleware((auth, req: NextRequest) => {
 const { userId, redirectToSignIn } = auth()

 // If the user isn't signed in and the route is private, redirect to sign-in
 if (!userId && !isPublicRoute(req)) return redirectToSignIn({ returnBackUrl: req.url })

 // If the user is logged in and the route is protected, let them view.
 if (userId && !isPublicRoute(req)) return NextResponse.next()
})

export const config = {
 matcher: [
 '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
 '/(api|trpc)(.*)',
 ],
}