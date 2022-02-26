// other imports
import Collapsible from 'react-collapsible';

export default function FCFAQ() {
  return (
    <div className='container' id='faq'>
      <h1>FAQ's</h1>
      <Collapsible trigger='What Are Floating Cats?' id='faq_Q-01'>
        <p id='answers-01'>
          We are a team located in Nagoya, Japan. 🗾 We love cats. Our goal is
          to build a strong community to help as many cats as possible. We plan
          to team up with local shelters and provide them with their needs . 🏡
          And of course, We are also planning to have weekly/monthly events to
          help shelters voluntarily. And it doesn’t stop there, we’re committed
          and wish to expand this moment worldwide. 🌍
        </p>
      </Collapsible>
      <Collapsible
        trigger='How many Floting Cats NFT’s will there be?'
        id='faq_Q-02'
      >
        <p id='answers-02'>
          There will be 5,888 unique NFT’s including 15 1️⃣OF1️⃣.
        </p>
      </Collapsible>
      <Collapsible trigger=' What is the mint price?' id='faq_Q-03'>
        <p id='answers'>TBD. Join our discord for the latest updates.</p>
      </Collapsible>
      <Collapsible trigger='Will there be a Whitelist?' id='faq_Q-04'>
        <p id='answers-04'>
          ✅ Yes, We will have giveaways for WL. Also, active community members
          who are helpful to each other and bring a positive vibe to the group
          will be rewarded. 🎉 Join our Discord for more details.
        </p>
      </Collapsible>
      <Collapsible trigger='What other benefits do I get?' id='faq_Q-05'>
        <p id='answers-05'>
          Besides being part of this great community, our holders will have a
          chance to win exclusive merchandise giveaways 👕 (weekly), and WL of
          other projects.🚀 Most of all, Opening Floating Cats Café in Nagoya
          has always been our dream. The cafe will partner and assist with local
          shelters, and provide even more space for those kitties with care and
          love. Meanwhile, the space is to be served as an interactive way to
          encourage adoption. 🏡 (Will consistently update some videos &
          pictures for the opening of the store)
        </p>
      </Collapsible>
    </div>
  );
}
