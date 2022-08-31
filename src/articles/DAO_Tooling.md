# How to DAO TBD reference doplnit k platformam a toolům
[Reference](https://aragon.org/dao) 
- Communication and coordination
- Voting and decision making
- Finance and contributor rewards
- Membership tracking and platform gating
- Broadcasting
- Legal

## 1. Communication and coordination 
This category includes everything your DAO contributors will use on a daily basis to talk with each other and coordinate. 
It's a difficult balance of making sure your DAO members have access to the right information, without making the information public to too many people.
**Async conversations**
[Discord](https://slack.com) / [Slack](https://slack.com) space for large group communication
**Documentation and note-taking**
You'll need to store documents, know-how, plans, projects, and notes somewhere 
**Meetings**
Many DAOs hold meetings in the voice channels of Discord, alternatively outside on Google Meet and Zoom.

### 1.1 Communication common issues
**Bot detection:** 
Discord servers can get overrun with bots quickly if you don’t implement a way to gate the server.
**Secure meetings:** 
It can be hard to have secure meetings if you don’t share a company email address. 
Getting in the habit of keeping sensitive and non-public meetings in safe locations
**Information security**
Keeping sensitive information secure, such as wallet addresses, can be difficult in an open environment such as a DAO. 

## 2. Voting and decision making
This category includes all the platforms you use when your DAO needs to make decisions. Some DAOs vote entirely on-chain, meaning their votes are cast and recorded on the blockchain, then the result of that vote is automatically executed via a smart contract. Other DAOs use mostly off-chain platforms, such as a polling software. A mix of both on-chain and off-chain has become commonplace in the DAO space.

**Discussions and debates** 
Ideas need to be shared and vetted before going up to vote. For this step, most DAOs use a traditional forum built on the open-source [Discourse](https://www.discourse.org/about) software.

**Off-chain voting**
Off-chain votes, which share the will of the voters without automatically executing an action, are often called signaling votes. 

- [Snapshot](https://snapshot.org), gasless decentralized governance
- [Tally](https://www.withtally.com), platform for analyzing and voting on crypto protocols.


**On-Chain voting**
DAOs are blockchain-enabled communities, meaning they use the blockchain to power their actions. DAOs vote “on-chain,” meaning they sign and record votes on the blockchain. 
They also use cryptocurrencies for payments, voting, ownership distribution, and more. Cryptocurrencies exist on the blockchain and require on-chain actions, such as signing transactions, to be moved.

Governor Bravo (open-source code), DAOhaus (front-end UI to a smart contract), and Aragon (front-end UI to a smart contract) are platforms you can use to create or plug-and-play smart contracts that automatically execute votes on-chain.

**Rules**
[Setup thresholds](https://aragon.org/how-to/setting-dao-governance-thresholds), laws given by code to keep governance continuum
- Minimum participation 
- Pass rate (typically 50%)
- Voting period (usually 3-14 days)

![Threshold examples](https://assets.website-files.com/5e997428d0f2eb13a90aec8c/62c2b0d31fcf419ded89fa68_table.png)

### 2.1 Voting common issues
**Fragmentation of an initiative** 
If your discussions and votes are held across multiple platforms, it could cause some initiatives to fizzle out as they move through the process.
**Regulation and moderation of the forum:** 
You’ll likely need someone to act as a forum manager to ensure it doesn’t get too messy (creating categories and archiving old conversations) and that conversations stay civil and kind.

## 3. Finance and contributor rewards

**Multisig wallets**
Teams will need to be able to initiate transactions to pay contributors and buy services.  

Platforms:
- Gnosis Safe
- Parcel (built on Gnosis)
- Aragon Finance (part of Aragon Client)
- [Juicebox](https://medium.com/@SpringWindVentures/dao-tooling-infrastructure-upon-which-daos-are-built-88f37d2197e9)
   
These platforms allow you to move funds if you have a certain number of signers. For paying contributors and initiating small transactions and token swaps, multisigs are the most common route.

**Peer-to-peer reward system**
Distribute compensation to contributors through a peer-to-peer fair distribution.
- [Coordinape](https://coordinape.com)
- [Utopia](https://www.utopialabs.com/)

**Posting and assigning bounties** 
Dework and Layer3 are popular bounty solutions. These platforms are where DAOs post bounties and contributors pick them up, kind of like freelancers on a gig economy platform.

### 3.1 Finance common issues
**Multisigs have a trusted element** 
Because multisigs are really just groups of people with signing power for an action, if multiple of your multisig signers leave the DAO or become malicious, you could be put in a tough spot.

**Diversifying the multisigs’ holdings will require many actions from signers**
If you’re trying to make many token swaps, your multisig signers will be on duty to sign many transactions.

## 4. Membership tracking and platform gating
You probably won’t want every Notion page you write or [Discord](https://discord.com/) channel you talk in to be open to the entire internet. So, you’ll need membership tracking and platform gating solutions as part of your DAO tooling stack.

**Membership tracking** 
POAPs are on-chain badges that contributors can earn for attending events or completing tasks.
Think of them as NFTs that you earn for completing something, or for being considered a member of a group. You can mint poaps for free at poap.xyz.

One disadvantage - You could need to issue a fresh set of NFTs, or some kind of unique members-only token, to effectively gate your servers and give permissions.

**Platform gating** 
Collab.land and Guild are platform-gating tools that allow you to token-gate your Discord server, Discourse, and more.
Collab.land is also useful for sending tips of tokens inside the server.

### 4.1 Membership common issues
It can be hard to strike a balance between how much information should be internet-public, and how much should be gated. This is especially tough when onboarding new members, or when members choose to leave the DAO and need to be offboard.

## 5. Broadcasting
Reaching your audience so you can sell your product or service, onboard new members, and share your mission with the world is another key piece of DAO tooling. This section will feel reminiscent of web2, since many of the same platforms still apply.

**Social media that reaches your ideal audience** 
This includes platforms like Twitter, Instagram, Facebook, Reddit, and LinkedIn. Or, for a web3 alternative, Lens is a new web3 native social media site. Find your audience where they are, and reach them :)

**Website:** 
Your DAO will likely need a website to reach your ideal audience, such as Wordpress, Squarespace, or Ghost.

**Writing platform:** 
How will you get your DAO’s ideas out into the world? Substack, Medium, Mirror, Ghost, and Paragraph are popular platforms.

**Social media management tool** 
If you’re using social media to reach your members and audience, consider something like Agorapulse, Hootsuite, or Later. These platforms are great for scheduling and reviewing content prior to posting.

### 5.1 Broadcasting common issues
**Permission management** 
Who has access to high-broadcast channels, such as the DAO’s Twitter account and Substack? Who has to review posts before they’re published? Permission management is a constant tug-of-war in DAOs. 

**Creating, maintaining, and updating a website and writing platform** 
It’s best to have a content strategy for your website and writing platform, but that can be hard in a decentralized environment.  Having a guild dedicated to maintaining written materials can be a good solution.

## 6. Legal
TBD -> Rozdělit separátně https://aragon.org/how-to/choose-a-legal-wrapper-for-your-dao
**Legal entity creation as-a-service** 
If you’d rather have an expert help you along the way, consider hiring a group that specializes in creating legal entities for DAOs.