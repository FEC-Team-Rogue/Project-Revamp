import React from 'react';
// import Overview from './Overview/Overview';
import RelatedItems from './RelatedItems/RelatedItems';
import QuestAnswers from './QuestAnswers/QuestAnswers';
import RatingsReviews from './RatingsReviews/RatingsReviews';
import DataProvider, { useData } from './SharedContexts/DataProvider';
import OverviewProvider from './SharedContexts/OverviewProvider';
import QuestionProvider from './QuestAnswers/QA - Context/DataProvider';

// import styles from './App.css';

function App() {
  const { productId } = useData();

  return (
    <>
      {productId ? (
        <DataProvider>
          <OverviewProvider>
            {/* <Overview /> */}
            <RelatedItems />
          </OverviewProvider>
          <QuestionProvider>
            <QuestAnswers />
          </QuestionProvider>
          <RatingsReviews />
        </DataProvider>
      ) : (<div>loading</div>)}
    </>
  );
}

export default App;
