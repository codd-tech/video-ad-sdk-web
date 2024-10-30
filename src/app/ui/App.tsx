import { useCallback } from 'react';

import { OnVideoSuccess } from '~/shared/api/video';
import { useGlobal } from '~/shared/store/global.store';

import { Layout } from '~/widgets/layout';
import { VideoPlayer } from '~/widgets/video';

import { withProviders } from '../providers';

const App = withProviders(() => {
  const isVisible = useGlobal((state) => state.isVisible);
  const video = useGlobal((state) => state.video);

  const hide = useGlobal((state) => state.hide);

  const onVideoEnded = useGlobal((state) => state.onVideoEnded);

  const handleVideoEnd = useCallback<OnVideoSuccess>(
    (status) => {
      onVideoEnded?.(status);
      hide();
    },
    [hide, onVideoEnded],
  );

  return (
    <>
      {isVisible && video ? (
        <Layout>
          <VideoPlayer onVideoEnded={handleVideoEnd} {...video} />
        </Layout>
      ) : null}
    </>
  );
});

export default App;
