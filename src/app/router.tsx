import { useSelector } from '@xstate/react';
import Footer from '@components/footer';
import useApp from '@hooks/useApp';
import Loading from '@views/loading';
import Playing from '@views/playing';
import Menu from '@views/menu';
import Warning from '@views/warning';

const Router = () => {
  const { service } = useApp();
  const state = useSelector(service, (state) => state.value);

  return (
    <>
      {state === 'loading' ? (
        <Loading />
      ) : state === 'warning' ? (
        <Warning />
      ) : (
        <>
          {state === 'menu' ? <Menu /> : null}
          {state === 'playing' ? <Playing /> : null}
          <Footer />
        </>
      )}
    </>
  );
};

export default Router;
