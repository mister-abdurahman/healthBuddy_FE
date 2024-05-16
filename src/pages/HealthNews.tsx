import { PageContainer } from "../ui/PageContainer";
import { useGetNewsQuery } from "../Data/Api/ApiHandler";
import { NewsCard } from "../features/News/NewsCard";
import { Spinner } from "../ui/Spinner";
import { ErrorComp } from "../ui/ErrorComp";
import { INews } from "../../Data/Interfaces";

export const HealthNews = () => {
  const {
    data: news,
    isLoading: loadingNews,
    isError: newsError,
  } = useGetNewsQuery("");

  if (loadingNews) return <Spinner />;
  if (news?.hasError || newsError) return <ErrorComp message={news?.message} />;

  return (
    <PageContainer title="HealthNews">
      <div className="flex gap-4 flex-wrap justify-center">
        {news.data.map((el: INews, i: number) => (
          <NewsCard key={i} news={el} />
        ))}
      </div>
    </PageContainer>
  );
};
