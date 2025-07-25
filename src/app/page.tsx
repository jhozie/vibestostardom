import Head from "next/head";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <Head>
        <title>Vibes To Stardom</title>
        <meta name="description" content="Something big is coming to Vibes To Stardom" />
      </Head>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-center mb-6 uppercase">
          Something big is coming
        </h1>
        <p className="text-lg sm:text-2xl font-mono text-center opacity-70">
          @ vibestostardom.com
        </p>
      </div>
    </div>
  );
}
