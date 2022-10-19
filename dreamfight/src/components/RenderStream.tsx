import React from "react";
import * as Rx from "rxjs";

export function RenderStream(props: {
  with: () => Rx.Observable<React.ReactNode>;
}): React.ReactElement {
  const [state, setState] = React.useState<React.ReactNode>(null);

  React.useEffect(() => {
    const subscription = props.with().subscribe(setState);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return <>{state}</>;
}
