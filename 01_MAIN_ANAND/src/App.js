import { render } from "react-dom";
import { StrictMode, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Details = lazy(() => import('./Details'))
const SearchParams = lazy(() => import('./SearchParams'))

const App = () => {
  return (
    <StrictMode>
        <Suspense fallback={<h1>loading route …</h1>}>
      <BrowserRouter>
        <nav style={{ paddingBottom: '3%' }}>
          <ul>
            <li>
              <h1><a href="index.html">Adopt Me!</a></h1>
              </li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="https://www.github.com/jen4web">Github</a></li>
            <li><a href="https://www.dropbox.com/s/3z2hm5gu3v2lrfy/JenKramerCV.pdf?dl=0">Resume</a></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
          <Route path="/" element={<SearchParams />} />
        </Routes>
      </BrowserRouter>
      </Suspense>
    </StrictMode>
  );
};

render(<App />, document.getElementById("root"));
