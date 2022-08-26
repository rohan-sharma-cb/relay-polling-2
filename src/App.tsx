import { RelayEnvironmentProvider, useLazyLoadQuery } from "react-relay/hooks";
import { Suspense } from "react";
import graphql from "babel-plugin-relay/macro";

import RelayEnvironment from "./RelayEnvironment";
import type { AppQuery } from "./__generated__/AppQuery.graphql";
import "./App.css";

const query = graphql`
  query AppQuery {
    getFilm(film: 4) {
      director
      title
    }
  }
`;

function App() {
  const data = useLazyLoadQuery<AppQuery>(
    query,
    {},
    { fetchPolicy: "network-only", networkCacheConfig: { poll: 3000 } }
  );

  return (
    <p>
      {data.getFilm.title} by {data.getFilm.director}
    </p>
  );
}

function AppRoot() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <div className="App">
        <header className="App-header">
          <Suspense fallback={"Loading..."}>
            <App />
          </Suspense>
        </header>
      </div>
    </RelayEnvironmentProvider>
  );
}

export default AppRoot;
