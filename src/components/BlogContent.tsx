"use client";

import React, { memo } from 'react';
import dynamic from 'next/dynamic';
import Sidebar from './Sidebar';
import BurgerMenu from './BurgerMenu';

const ActiveSectionObserver = dynamic(() => import('./ActiveSectionObserver'), {
  ssr: false
});

const CodeBlock = memo(({ code }: { code: string }) => (
  <pre>
    <code>{code}</code>
  </pre>
));

CodeBlock.displayName = 'CodeBlock';

const BlogContent = () => {
  return (
    <>
      <div className="main-heading">
        <h1>useContext Hook</h1>
      </div>
      <div className="container">
        <ActiveSectionObserver />
        <div className="desktop-sidebar">
          <Sidebar />
        </div>
        <div className="mobile-sidebar">
          <BurgerMenu>
            <Sidebar />
          </BurgerMenu>
        </div>
        <main className="blog-content" role="main">
          <article>
            <h2 id="why-care">Why Should You Care About useContext?</h2>
            <p>
              <strong>useContext</strong> is a React Hook that lets you read and subscribe to context from your component.
              It's particularly useful when you need to share data that can be considered "global" for a tree of React components.
              This hook is essential for managing global state, such as themes or user authentication, and makes your code cleaner and more maintainable.
            </p>

            <h2 id="using-usecontext">Passing Data Deeply with useContext</h2>
            <p>
              Sometimes, you need to share data across multiple components without passing props manually at every level. 
              This is where useContext comes in!
            </p>

            <h3 id="how-it-works">How It Works</h3>
            <p>
              At the top of your component, call useContext and pass in the context you want to use:
            </p>
            <CodeBlock code={`import { useContext } from "react";

function Button() {
  const theme = useContext(ThemeContext);
  // Now the button can use the theme value!
}`} />

            <h3 id="getting-context-value">Getting the Context Value</h3>
            <p>
              React automatically looks up the component tree to find the nearest provider 
              (<code>&lt;ThemeContext.Provider&gt;</code>) for that context. If it finds one, 
              it uses the value from that provider.
            </p>
            <p>
              To make sure your Button gets the right theme, wrap it (or one of its parent components) 
              inside the provider:
            </p>
            <CodeBlock code={`function MyPage() {
  return (
    <ThemeContext.Provider value="dark">
      <Form />
    </ThemeContext.Provider>
  );
}

function Form() {
  // This can have buttons inside it
}`} />
            <p>
              Even if there are many components between <code>ThemeContext.Provider</code> and <code>Button</code>, 
              it doesn't matter! As long as <code>Button</code> is somewhere inside <code>Form</code>, 
              it will receive "dark" as the theme value when it calls <code>useContext(ThemeContext)</code>.
            </p>

            <h3>How to Use It</h3>
            <p>
              At the top of your component, call useContext and pass in the context you created with createContext:
            </p>
            <CodeBlock code={`import { useContext } from "react";

function MyComponent() {
  const theme = useContext(ThemeContext);
  // Now you can use the theme value here
}`} />

            <h3>What It Does</h3>
            <ul>
              <li><code>useContext(SomeContext)</code> gives you the nearest value provided by a <code>&lt;SomeContext.Provider&gt;</code> above your component in the tree.</li>
              <li>If no provider is found, it returns the default value set in createContext.</li>
              <li>React keeps this value updated, so when it changes, the component will automatically re-render.</li>
            </ul>

            <h3>Things to Keep in Mind</h3>
            <ul>
              <li>The provider (<code>&lt;SomeContext.Provider&gt;</code>) must be above the component using useContext. If it's inside the same component, it won't work.</li>
              <li>When the context value changes, every component that uses it will re-render. Even if you use memo, the new value still gets passed down.</li>
              <li>If your project has duplicate versions of the same module (which can happen with symlinks), context might break because React expects the provider and consumer to reference exactly the same context object.</li>
            </ul>

            <h2 id="updating-context">Updating Context</h2>
            <p>
              To update context, combine it with state. Here's how you can toggle a theme:
            </p>
            <CodeBlock code={`import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

function MyApp() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Button />
    </ThemeContext.Provider>
  );
}

function Button() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme
    </button>
  );
}`} />

            <h2 id="default-values">Setting a Default Value for Context</h2>
            <p>
              What happens if a component tries to use useContext but there's no provider 
              (<code>&lt;SomeContext.Provider&gt;</code>) above it in the tree? In that case, 
              React will return the default value you set when creating the context.
            </p>

            <h3 id="how-to-set-default">How to Set a Default Value</h3>
            <p>
              When creating a context with createContext, you can specify a default value:
            </p>
            <CodeBlock code={`const ThemeContext = createContext(null);`} />
            <p>
              This default value never changes and is only used if no provider is found.
            </p>
            <p>
              Instead of null, it's often better to use a meaningful default, like "light":
            </p>
            <CodeBlock code={`const ThemeContext = createContext("light");`} />
            <p>
              Now, if a component uses <code>useContext(ThemeContext)</code> but isn't wrapped in a provider, 
              it will still receive "light", preventing errors.
            </p>

            <h3 id="why-use-default">Why Use a Default Value</h3>
            <ul>
              <li>Prevents crashes when a provider is missing.</li>
              <li>Makes testing easier by allowing components to work without setting up extra providers.</li>
            </ul>
            <p>
              For example, in the code below, the "Toggle theme" button will always use "light" 
              because it's not inside a provider:
            </p>
            <CodeBlock code={`function ToggleThemeButton() {
  const theme = useContext(ThemeContext);
  return <button>{theme}</button>;
}

// If you change the default to "dark", the button will show "dark" instead.
// Try it out! `} />

            <h2 id="common-pitfalls">Common Pitfalls</h2>
            <div className="pitfall-box">
              <h3>🚨 Important Pitfall to Remember</h3>
              <p>
                <code>useContext()</code> always looks for the closest provider <em>above</em> the component that calls it. 
                It searches upwards and <strong>does not</strong> consider providers in the component from which you're calling <code>useContext()</code>.
              </p>
              <CodeBlock code={`// ❌ This won't work as expected
function MyComponent() {
  // This useContext() call will NOT find the provider
  // that's rendered below it in the same component
  const theme = useContext(ThemeContext);

  return (
    <ThemeContext.Provider value="dark">
      <div>{theme}</div> 
    </ThemeContext.Provider>
  );
}

// ✅ This is the correct way
function Parent() {
  return (
    <ThemeContext.Provider value="dark">
      <Child />
    </ThemeContext.Provider>
  );
}

function Child() {
  // This will correctly find the provider above
  const theme = useContext(ThemeContext);
  return <div>{theme}</div>;
}`} />
            </div>

            <h2 id="overriding-context">Overriding Context</h2>
            <p>
              You can override context for a part of the tree by wrapping it in a provider with a different value.
              This is particularly useful for creating nested contexts or overriding values for specific sections of your app.
            </p>

            <h2 id="avoiding-rerenders">Avoiding Unnecessary Re-Renders with Context</h2>
            <p>
              You can pass anything into a context—objects, functions, or simple values. But sometimes, 
              passing objects and functions can cause unnecessary re-renders in your app.
            </p>

            <h3 id="the-problem">The Problem</h3>
            <p>Take this example:</p>
            <CodeBlock code={`function MyApp() {
  const [currentUser, setCurrentUser] = useState(null);

  function login(response) {
    storeCredentials(response.credentials);
    setCurrentUser(response.user);
  }

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      <Page />
    </AuthContext.Provider>
  );
}`} />
            <p>
              Here, the context provides an object with both currentUser and a login function. 
              But every time MyApp re-renders (for example, on a route change), a new object is created 
              and passed as the context value. React sees this as a "change," even if currentUser hasn't 
              actually changed, which forces all components using useContext(AuthContext) to re-render.
            </p>
            <p>
              For small apps, this isn't a big deal. But for larger apps, we can optimize it!
            </p>

            <h3 id="the-solution">The Solution: useMemo and useCallback</h3>
            <p>We can prevent unnecessary re-renders by using:</p>
            <ul>
              <li><code>useCallback</code>: Wraps the login function so it stays the same unless setCurrentUser changes.</li>
              <li><code>useMemo</code>: Keeps the context value the same unless currentUser actually changes.</li>
            </ul>
            <CodeBlock code={`import { useCallback, useMemo } from "react";

function MyApp() {
  const [currentUser, setCurrentUser] = useState(null);

  const login = useCallback((response) => {
    storeCredentials(response.credentials);
    setCurrentUser(response.user);
  }, []);

  const contextValue = useMemo(() => ({ currentUser, login }), [currentUser, login]);

  return (
    <AuthContext.Provider value={contextValue}>
      <Page />
    </AuthContext.Provider>
  );
}`} />

            <h3 id="why-it-works">Why This Works</h3>
            <p>Now, even if MyApp re-renders:</p>
            <ul>
              <li>The login function stays the same thanks to useCallback.</li>
              <li>The contextValue object stays the same unless currentUser changes.</li>
              <li>Components using useContext(AuthContext) won't re-render unless they actually need to!</li>
            </ul>
            <p>This keeps your app faster and more efficient. 🚀</p>

            <h2 id="troubleshooting">Troubleshooting</h2>
            <p>
              Common issues include:
            </p>
            <ul>
              <li>Not wrapping components with a provider</li>
              <li>Mismatched context objects due to multiple instances</li>
              <li>Unnecessary re-renders due to new object references</li>
              <li>Context values being undefined when they shouldn't be</li>
            </ul>
          </article>
        </main>
      </div>
    </>
  );
};

export default memo(BlogContent); 