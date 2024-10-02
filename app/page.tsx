import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision"
import { Cover } from "@/components/ui/cover"
import { Button } from "@/components/ui/moving-border"
import Link from 'next/link'

export default function HomePage() {
  return (
    <BackgroundBeamsWithCollision>
      <div className="flex flex-col flex-grow">
        <section className="w-full flex-grow flex items-center justify-center flex-col">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] text-center">
              <div className="max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none mb-6">
                  Welcome to CodeEditor
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 mb-4">
                  Discover amazing features and boost your productivity with our innovative solutions.
                </p>
                <p className="text-m font-semibold max-w-7xl mx-auto text-center relative z-20 bg-clip-text mb-8 text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
                  Get Help using AI use <Cover>Ctrl + L</Cover>
                </p>
                <div className="flex justify-center space-x-4">
                  <Link href="/codeEditor" passHref>
                    <Button
                      borderRadius="1.75rem"
                      className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
                    >
                      Get Started
                    </Button>
                  </Link>
                  <Button variant="outline">Learn More</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </BackgroundBeamsWithCollision>
  )
}