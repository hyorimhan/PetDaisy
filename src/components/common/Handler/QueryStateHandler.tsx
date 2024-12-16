import Card from "../Card/Card";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";

type StateHandlerProps<TData> = {
  data: TData | undefined | null;
  isPending: boolean;
  isError: boolean;
  children: React.ReactNode;
  wrapper?: boolean;
};
function QueryStateHandler<TData>({
  data,
  isPending,
  isError,
  children,
  wrapper = true,
}: StateHandlerProps<TData>) {
  if (!data) return <Loading />;

  if (isPending)
    return wrapper ? (
      <Card>
        <Loading />
      </Card>
    ) : (
      <Loading />
    );

  if (isError)
    return wrapper ? (
      <Card>
        <Error />
      </Card>
    ) : (
      <Error />
    );

  return <>{children}</>;
}

export default QueryStateHandler;
