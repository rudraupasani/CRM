'use client'

import { FormEvent, useState } from 'react'
import { ArrowRight, Check, Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react'
import { siteConfig } from '@/config/site'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="auth-shell">
      <section className="auth-visual">
        <div className="brand-row">
          <div className="brand-mark">{siteConfig.brandInitial}</div>
          <span className="brand-name">{siteConfig.name}</span>
        </div>

        <div className="auth-visual-copy">
          <p className="eyebrow">The calmer way to grow</p>
          <h1>
            All your relationships.
            <br />
            <em>One clear view.</em>
          </h1>
          <p>
            {siteConfig.name} brings your leads, deals, tasks, and customer
            conversations together so your team can focus on the work that matters.
          </p>
          <div className="auth-proof">
            <div className="proof-avatars">
              <span>OM</span>
              <span>JK</span>
              <span>SW</span>
              <span>+2k</span>
            </div>
            <span>Trusted by modern revenue teams</span>
          </div>
        </div>

        <div className="auth-quote">
          <span>“</span>
          <p>
            {siteConfig.name} gives us the clarity to make better decisions every
            single day.
          </p>
          <strong>— Olivia Martin, Acme Inc.</strong>
        </div>
      </section>

      <section className="auth-form-side">
        <div className="auth-form-wrap">
          <div className="mobile-brand">
            <div className="brand-mark">{siteConfig.brandInitial}</div>
            <span className="brand-name">{siteConfig.name}</span>
          </div>

          <div className="auth-heading">
            <p className="eyebrow">Welcome back</p>
            <h2>Sign in to your workspace</h2>
            <p>Enter your details to continue to {siteConfig.name}.</p>
          </div>

          {submitted ? (
            <div className="auth-success">
              <span>
                <Check size={20} />
              </span>
              <h2>You&apos;re signed in</h2>
              <p>Your workspace is ready. Continue to your dashboard.</p>
              <a className="primary-button" href="/">
                Open dashboard <ArrowRight size={16} />
              </a>
            </div>
          ) : (
            <form className="auth-form" onSubmit={submit}>
              <label>
                Email address
                <div className="auth-input">
                  <Mail size={17} />
                  <input
                    type="email"
                    placeholder="you@company.com"
                    required
                  />
                </div>
              </label>

              <label>
                Password
                <div className="auth-input">
                  <LockKeyhole size={17} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </label>

              <div className="auth-options">
                <label className="remember">
                  <input type="checkbox" /> Remember me
                </label>
                <a href="#forgot">Forgot password?</a>
              </div>

              <button className="primary-button auth-submit" type="submit">
                Sign in <ArrowRight size={16} />
              </button>

              <p className="auth-footnote">
                Don&apos;t have an account? <a href="#signup">Start a free trial</a>
              </p>
            </form>
          )}

          <p className="auth-legal">
            By continuing, you agree to our <a href="#terms">Terms of Service</a>{' '}
            and <a href="#privacy">Privacy Policy</a>.
          </p>
        </div>
      </section>
    </main>
  )
}
