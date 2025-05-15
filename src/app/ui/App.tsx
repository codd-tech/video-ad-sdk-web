import { useCallback, useEffect, useMemo } from 'react';

import { AdType, OnAdSuccess, useAdConfirm, useAdSync } from '~/shared/api/ad';
import { useLoadKinescope } from '~/shared/lib/kinescope';
import { useGlobal } from '~/shared/store/global.store';
import { Loader } from '~/shared/ui';
import { ImageContent } from '~/widgets/image-content';
import { Layout } from '~/widgets/layout';
import { VideoKinescope } from '~/widgets/video-kinescope';

import { withProviders } from '../providers';

import './global.scss';

const App = withProviders(() => {
  const isVisible = useGlobal((state) => state.isVisible);
  const adUnitId = useGlobal((state) => state.adUnitId);

  const ad = useGlobal((state) => state.ad);
  const setAd = useGlobal((state) => state.setAd);

  const hide = useGlobal((state) => state.hide);

  const onEnded = useGlobal((state) => state.onEnded);
  const onError = useGlobal((state) => state.onError);
  const onClick = useGlobal((state) => state.onClick);
  const onAdLoaded = useGlobal((state) => state.onAdLoaded);

  const handleError = useCallback(
    (error: Error) => {
      hide();
      onError?.(error);
    },
    [hide, onError],
  );

  const { mutate, isPending } = useAdSync((data) => {
    if (!data.data) {
      handleError(new Error('no_fill'));

      return;
    }

    setAd(data);
  }, handleError);
  const { mutate: confirm } = useAdConfirm(handleError);

  const isStatic = useMemo(() => ad?.data?.contentType === AdType.Image, [ad?.data?.contentType]);

  const handleADEnd = useCallback<OnAdSuccess>(
    (status) => {
      const key = ad?.data?.confirmKey;

      if (key) {
        confirm(key);
      }

      onEnded?.(status);
      hide();
    },
    [ad?.data?.confirmKey, confirm, hide, onEnded],
  );

  const factory = useLoadKinescope(handleError);

  useEffect(() => {
    if (isVisible && adUnitId) {
      mutate(adUnitId);
    }
  }, [isVisible, adUnitId, mutate]);

  return (
    <>
      {isPending ? <Loader /> : null}

      {isVisible && ad?.data ? (
        <Layout>
          {isStatic ? (
            <ImageContent
              onEnded={handleADEnd}
              onClick={onClick}
              onAdLoaded={onAdLoaded}
              {...ad.data}
            />
          ) : (
            <VideoKinescope
              factory={factory}
              onEnded={handleADEnd}
              onClick={onClick}
              onAdLoaded={onAdLoaded}
              {...ad.data}
            />
          )}
        </Layout>
      ) : null}
    </>
  );
});

export default App;
