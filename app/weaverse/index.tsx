import {WeaverseHydrogenRoot} from '@weaverse/hydrogen';
import components from './components';
import {useLoaderData, Await} from '@remix-run/react';
import {Suspense} from 'react';

function WeaverseHydrogen({data}) {
  return <WeaverseHydrogenRoot components={components} data={data} />;
}
export function WeaverseContent() {
  let {weaverseData, ...rest} = useLoaderData();
  if (weaverseData) {
    if (weaverseData.then) {
      return (
        <Suspense>
          <Await resolve={weaverseData}>
            {(weaverseData) => (
              <WeaverseHydrogen data={{...rest, weaverseData}} />
            )}
          </Await>
        </Suspense>
      );
    }
    return <WeaverseHydrogen data={{...rest, weaverseData}} />;
  }
  return (
    <div style={{display: 'none'}}>
      No weaverseData return from Remix loader!
    </div>
  );
}
export default WeaverseContent;
