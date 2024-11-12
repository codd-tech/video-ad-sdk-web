import { useCallback, useEffect, useMemo } from 'react';

import { OnVideoSuccess } from '~/shared/api/video';
import { useMuteElements } from '~/shared/hooks';
import { useGlobal } from '~/shared/store/global.store';

import { Layout } from '~/widgets/layout';
import { VIDEO_ID, VideoPlayer } from '~/widgets/video';

import { withProviders } from '../providers';

const App = withProviders(() => {
  const isVisible = useGlobal((state) => state.isVisible);
  const video = useGlobal((state) => state.video);

  const hide = useGlobal((state) => state.hide);

  const onVideoEnded = useGlobal((state) => state.onVideoEnded);

  const { handleMuteAll, handleUnmuteAll } = useMuteElements();

  const shouldShowVideoPlayer = useMemo(() => isVisible && !!video, [isVisible, video]);

  useEffect(() => {
    if (shouldShowVideoPlayer) {
      handleMuteAll(VIDEO_ID);
    }
  }, [handleMuteAll, handleUnmuteAll, shouldShowVideoPlayer]);

  const handleVideoEnd = useCallback<OnVideoSuccess>(
    (status) => {
      onVideoEnded?.(status);
      hide();
      handleUnmuteAll();
    },
    [handleUnmuteAll, hide, onVideoEnded],
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
