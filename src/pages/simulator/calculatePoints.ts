export const getDailyBasePoints = (totalDeposit: number) => {
  return 2400 * totalDeposit;
};

export const getReferrerBoost = () => {
  return 1.2;
};

export const getXBoost = (xConnected: boolean) => {
  return xConnected ? 1.1 : 1;
};

export const getWelcomeBoost = (referralCodeApplied: boolean) => {
  return referralCodeApplied ? 1.15 : 1;
};

export const getMorseBoost = (haveMorse: boolean) => {
  return haveMorse ? 1.3 : 1;
};

export const getBracketBoost = (totalDeposit: number) => {
  if (totalDeposit >= 1 && totalDeposit < 1) {
    return 1.1;
  } else if (totalDeposit >= 1 && totalDeposit < 3) {
    return 1.1;
  } else if (totalDeposit >= 3 && totalDeposit < 5) {
    return 1.15;
  } else if (totalDeposit >= 5 && totalDeposit < 10) {
    return 1.2;
  } else if (totalDeposit >= 10 && totalDeposit < 25) {
    return 1.25;
  } else if (totalDeposit >= 25 && totalDeposit < 40) {
    return 1.3;
  } else if (totalDeposit >= 40 && totalDeposit < 55) {
    return 1.35;
  } else if (totalDeposit >= 55 && totalDeposit < 100) {
    return 1.5;
  } else if (totalDeposit >= 100 && totalDeposit < 200) {
    return 1.7;
  } else if (totalDeposit >= 200 && totalDeposit < 500) {
    return 1.8;
  } else if (totalDeposit >= 500 && totalDeposit < 1000) {
    return 1.9;
  } else if (totalDeposit > 1000) {
    return 2;
  }
  return 1;
};

export const getHoldingDurationBoost = (holdingDays: number) => {
  return 1 + holdingDays * 0.007;
};

export const getTestnetBoost = (tier: string) => {
  if (tier === 'bronze') {
    return 1;
  } else if (tier === 'silver') {
    return 1.1;
  } else if (tier === 'gold') {
    return 1.15;
  } else if (tier === 'platinum') {
    return 1.3;
  } else if (tier === 'diamond') {
    return 1.5;
  }
  return 1;
};

export const getEigenlayerBoost = (eigenlayerPoints: number) => {
  if (eigenlayerPoints >= 100 && eigenlayerPoints < 500) {
    return 1.05;
  } else if (eigenlayerPoints >= 500 && eigenlayerPoints < 1000) {
    return 1.1;
  } else if (eigenlayerPoints >= 1000 && eigenlayerPoints < 5000) {
    return 1.15;
  } else if (eigenlayerPoints >= 5000 && eigenlayerPoints < 10000) {
    return 1.2;
  } else if (eigenlayerPoints >= 10000 && eigenlayerPoints < 50000) {
    return 1.3;
  } else if (eigenlayerPoints >= 50000 && eigenlayerPoints < 100000) {
    return 1.4;
  } else if (eigenlayerPoints >= 100000 && eigenlayerPoints < 200000) {
    return 1.5;
  } else if (eigenlayerPoints >= 200000) {
    return 1.6;
  }

  return 1;
};

export const getOnboardingPointsAndBadge = (xConnected: boolean) => {
  if (xConnected) {
    return { points: 500 + 1000 + 500 + 500 + 3000, badges: ['M', 'I', 'T', 'O', 'Welcome'] };
  } else {
    return { points: 0, badges: [] };
  }
};

interface Level {
  balance: number;
  days: number;
  points: number;
}

const levels: Level[] = [
  { balance: 0, days: 0, points: 100 },
  { balance: 0.001, days: 1, points: 300 },
  { balance: 0.005, days: 1, points: 500 },
  { balance: 0.01, days: 1, points: 1000 },
  { balance: 0.1, days: 3, points: 1500 },
  { balance: 0.3, days: 3, points: 2000 },
  { balance: 0.5, days: 3, points: 2500 },
  { balance: 1, days: 7, points: 3000 },
  { balance: 3, days: 7, points: 10000 },
  { balance: 5, days: 7, points: 15000 },
  { balance: 10, days: 14, points: 35000 },
  { balance: 10, days: 21, points: 100000 },
  { balance: 30, days: 28, points: 200000 },
  { balance: 30, days: 35, points: 500000 },
  { balance: 50, days: 42, points: 1000000 },
  { balance: 50, days: 60, points: 2000000 },
];

export function getHolderPointsAndBadges(depositedAmount: number, heldDays: number) {
  let totalPoints = 0;
  const badges: string[] = [];

  for (let i = 0; i < levels.length; i++) {
    if (depositedAmount >= levels[i].balance && heldDays >= levels[i].days) {
      totalPoints += levels[i].points;
      badges.push(`Holder ${i + 1}`);
    }
  }

  return { points: totalPoints, badges };
}

interface EvangelistLevel {
  referrals: number;
  points: number;
}

const evangelistLevels: EvangelistLevel[] = [
  { referrals: 0, points: 100 },
  { referrals: 1, points: 300 },
  { referrals: 2, points: 500 },
  { referrals: 3, points: 1000 },
  { referrals: 4, points: 1500 },
  { referrals: 5, points: 2000 },
  { referrals: 7, points: 3000 },
  { referrals: 9, points: 4000 },
  { referrals: 11, points: 5000 },
  { referrals: 13, points: 6000 },
  { referrals: 15, points: 7000 },
  { referrals: 20, points: 8000 },
  { referrals: 25, points: 9000 },
  { referrals: 30, points: 10000 },
  { referrals: 40, points: 10000 },
  { referrals: 50, points: 10000 },
];

export function getEvangelistPointsAndBadges(referredWallets: number) {
  let totalPoints = 0;
  const badges: string[] = [];

  for (let i = 0; i < evangelistLevels.length; i++) {
    if (referredWallets >= evangelistLevels[i].referrals) {
      totalPoints += evangelistLevels[i].points;
      badges.push(`Evangelist ${i + 1}`);
    }
  }

  return { points: totalPoints, badges };
}
