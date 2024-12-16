import { useCallback, useEffect, useMemo } from 'react';

import { AdTypes, OnAdSuccess } from '~/shared/api/ad';
import { useMuteElements } from '~/shared/hooks';
import { useLoadKinescope } from '~/shared/lib/kinescope';
import { useGlobal } from '~/shared/store/global.store';

import { Layout } from '~/widgets/layout';
import { VIDEO_ID } from '~/widgets/video';
import { VideoKinescope } from '~/widgets/video-kinescope';

import { withProviders } from '../providers';

const App = withProviders(() => {
  const isVisible = useGlobal((state) => state.isVisible);
  const ad = useGlobal((state) => state.ad);
  const adUnit = useGlobal((state) => state.adUnit);

  const hide = useGlobal((state) => state.hide);

  const onEnded = useGlobal((state) => state.onEnded);
  const onClick = useGlobal((state) => state.onClick);

  const { handleMuteAll, handleUnmuteAll } = useMuteElements();

  const shouldShowVideoPlayer = useMemo(() => isVisible && !!ad, [isVisible, ad]);

  const isStatic = useMemo(() => adUnit?.type === AdTypes.StaticCreative, [adUnit?.type]);

  useEffect(() => {
    if (shouldShowVideoPlayer) {
      handleMuteAll(VIDEO_ID);
    }
  }, [handleMuteAll, handleUnmuteAll, shouldShowVideoPlayer]);

  const handleVideoEnd = useCallback<OnAdSuccess>(
    (status) => {
      onEnded?.(status);
      hide();
      handleUnmuteAll();
    },
    [handleUnmuteAll, hide, onEnded],
  );

  const factory = useLoadKinescope();

  return (
    <>
      {isVisible && ad && adUnit ? (
        <Layout>
          {isStatic ? null : (
            <VideoKinescope
              factory={factory}
              onEnded={handleVideoEnd}
              onClick={onClick}
              {...ad}
              {...adUnit}
              src="https://kinescope.io/5QMd936Jt7mfjat6v34MfD"
            />
          )}
        </Layout>
      ) : null}
    </>
  );
});

export default App;
