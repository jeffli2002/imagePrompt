import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@saasfly/ui";
import { buttonVariants } from "@saasfly/ui/button";
import * as Icons from "@saasfly/ui/icons";

import { UserAuthForm } from "~/components/user-auth-form";
import type { Locale } from "~/config/i18n-config";
import { getDictionary } from "~/lib/get-dictionary";

export const metadata: Metadata = {
  title: "Login - Create Better AI Art",
  description: "Login to create amazing AI art with Image Prompt",
};

export default async function LoginPage({
  params: { lang },
}: {
  params: {
    lang: Locale;
  };
}) {
  const dict = await getDictionary(lang);
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="container flex items-center justify-between py-6">
        <Link
          href={`/${lang}`}
          className="flex items-center space-x-2"
        >
          <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
            <Icons.Image className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold">ImagePrompt.org</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 container flex flex-col items-center justify-center py-12">
        <div className="w-full max-w-4xl space-y-8 text-center">
          {/* Hero Section */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Create Better AI Art
              <br />
              with <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">Image Prompt</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Inspire ideas, Enhance image prompt, Create masterpieces
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-card border rounded-lg p-8 max-w-md mx-auto">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">{dict.login.welcome_back}</h2>
                <p className="text-sm text-muted-foreground">
                  {dict.login.signin_title}
                </p>
              </div>
              <UserAuthForm lang={lang} dict={dict.login} />
              <p className="px-8 text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  href={`/${lang}/register`}
                  className="text-purple-600 hover:text-purple-700 underline underline-offset-4"
                >
                  Sign up now
                </Link>
              </p>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icons.Image className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold">Image to Prompt</h3>
              <p className="text-sm text-muted-foreground">
                Convert images to Prompt to generate your own image
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icons.Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold">Magic Enhance</h3>
              <p className="text-sm text-muted-foreground">
                Transform simple text into detailed, descriptive image prompt
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icons.ScanSearch className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold">AI Describe Image</h3>
              <p className="text-sm text-muted-foreground">
                Let AI help you understand and analyze any image in detail
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icons.Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold">AI Image Generator</h3>
              <p className="text-sm text-muted-foreground">
                Transform your image prompt into stunning visuals with AI-powered generation
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
