import FCAbout from 'components/FCAbout';
import FCBanner from 'components/FCBanner';
import FCBgCloud from 'components/FCBgCloud';
import FCFAQ from 'components/FCFAQ';
import FCRoadmap from 'components/FCRoadmap';
import FCTeam from 'components/FCTeam';

export default function Home() {
  return (
    <>
      {/* <FCBgCloud /> */}
      <FCBanner />
      <FCAbout />
      <FCRoadmap />
      <FCTeam />
      <FCFAQ />
    </>
  );
}
