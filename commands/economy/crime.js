const userAccount = require("../../schemas/userAccount");

module.exports = {
    name: "crime",
    description: "Commit a crime to get some money",
    requiresAccount: true,
    givesxp: true,
    cooldown: 120000,

        run: async(client, interaction) => {
            
            await interaction.deferReply();
        
            const existingUser = await userAccount.findOne({ userId: interaction.user.id });

            const result = Math.random() < 0.4 ? "success" : "failure";

            let amount;

            if(result == "success") {

                amount = Math.floor(Math.random() * 1500) + 1;
                const successfulCrimes = [
                    `<a:tekcoin:1234188584664436778> You disguise yourself as a pizza delivery person and successfully infiltrate the bank's security. You walk away with a hefty sum of **__${amount}__** coins! The perfect crime.`,
                    `<a:tekcoin:1234188584664436778> You hack into the city's traffic light system and orchestrate the perfect distraction. While chaos ensues on the streets, you calmly rob the jewelry store and make off with **__${amount}__** coins. Smooth.`,
                    `<a:tekcoin:1234188584664436778> Disguised as a maintenance worker, you sneak into the museum and replace the Mona Lisa with a convincing replica. You sell the original for **__${amount}__** coins to a private collector.`,
                    `<a:tekcoin:1234188584664436778> You stage a daring heist on a moving train, bypassing security and making off with a fortune in cash and jewels. Your take: **__${amount}__** coins. Mission accomplished.`,
                    `<a:tekcoin:1234188584664436778> Under the cover of darkness, you break into the mayor's mansion and crack open the safe. Inside, you find **__${amount}__** coins in cold, hard cash. Not bad for a night's work.`,
                    `<a:tekcoin:1234188584664436778> You pose as a celebrity chef and infiltrate a high-profile gala. While everyone is distracted by your culinary delights, you discreetly make off with **__${amount}__** coins from the charity auction.`,
                    `<a:tekcoin:1234188584664436778> With the help of your trusty sidekick, you pull off a daring casino heist worthy of Hollywood. You walk away with **__${amount}__** coins in chips and a grin on your face.`,
                    `<a:tekcoin:1234188584664436778> You engineer an elaborate Ponzi scheme that fools even the savviest investors. When the dust settles, you're left with **__${amount}__** coins in ill-gotten gains.`,
                    `<a:tekcoin:1234188584664436778> You infiltrate the annual art auction disguised as a wealthy collector. As the bidding war heats up, you quietly secure the winning bid on a priceless painting, pocketing **__${amount}__** coins in profit.`,
                    `<a:tekcoin:1234188584664436778> You hack into the central bank's mainframe and transfer a substantial sum of money into your offshore account. Your balance now reads **__${amount}__** coins richer.`,
                    `<a:tekcoin:1234188584664436778> Posing as a master forger, you create impeccable replicas of rare artifacts and sell them to unsuspecting collectors. Your latest sale nets you **__${amount}__** coins in profit.`,
                    `<a:tekcoin:1234188584664436778> You orchestrate a daring escape from prison, outsmarting the guards and disappearing without a trace. As a free person, you help yourself to **__${amount}__** coins from the local bank vault.`,
                    `<a:tekcoin:1234188584664436778> You infiltrate a high-security government facility and hack into their classified database. Inside, you find valuable intel worth **__${amount}__** coins to the right buyer.`,
                    `<a:tekcoin:1234188584664436778> With nerves of steel, you stage a daring jewelry heist during rush hour. The chaos of the city provides the perfect cover as you make off with **__${amount}__** coins in precious gems.`,
                    `<a:tekcoin:1234188584664436778> In a stroke of genius, you develop a counterfeit currency so convincing that it fools even the most sophisticated banks. You flood the market and walk away with **__${amount}__** coins in legitimate profit.`,
                    `<a:tekcoin:1234188584664436778> You masquerade as a wealthy aristocrat and charm your way into the inner circle of high society. With access to their vaults, you help yourself to **__${amount}__** coins in priceless artifacts.`,
                    `<a:tekcoin:1234188584664436778> Posing as a renowned art thief, you pull off a daring museum heist worthy of the history books. Your take: **__${amount}__** coins in stolen masterpieces.`,
                    `<a:tekcoin:1234188584664436778> You enlist the help of a skilled hacker to infiltrate a cryptocurrency exchange. Together, you siphon off **__${amount}__** coins in digital currency before disappearing into the dark web.`,
                    `<a:tekcoin:1234188584664436778> With nerves of steel, you stage a daring casino heist during a celebrity poker tournament. As the chips fly, you make off with **__${amount}__** coins in winnings.`,
                    `<a:tekcoin:1234188584664436778> In a stroke of brilliance, you stage a fake alien invasion to distract the authorities while you rob a priceless artifact from the museum. Your take: **__${amount}__** coins in ancient treasure.`,
                    `<a:tekcoin:1234188584664436778> You hatch a plan to steal the crown jewels from the royal palace. With nerves of steel, you execute the heist flawlessly and make off with **__${amount}__** coins in royal treasures.`,
                    `<a:tekcoin:1234188584664436778> Posing as a renowned art collector, you infiltrate a private auction and outbid the competition on a rare painting. The artwork is worth **__${amount}__** coins to the right buyer.`,
                    `<a:tekcoin:1234188584664436778> You pull off a daring bank heist using only a pair of wire cutters and a fake moustache. As the dust settles, you're left with **__${amount}__** coins in unmarked bills.`,
                    `<a:tekcoin:1234188584664436778> With nerves of steel, you stage a daring train robbery straight out of the Wild West. The loot: **__${amount}__** coins in gold bars.`,
                    `<a:tekcoin:1234188584664436778> You masquerade as a celebrity chef and infiltrate a high-profile food festival. While the crowds are distracted by your cooking, you discreetly help yourself to **__${amount}__** coins from the event's cash register.`,
                    `<a:tekcoin:1234188584664436778> You infiltrate a high-security research facility and steal a prototype for a revolutionary new technology. The blueprint is worth **__${amount}__** coins to the right buyer.`,
                    `<a:tekcoin:1234188584664436778> You pose as a famous author and host a book signing event. While fans clamor for your signature, you discreetly slip **__${amount}__** coins from the bookstore's safe.`,
                    `<a:tekcoin:1234188584664436778> With the help of your trusty sidekick, you orchestrate a daring jewel heist during a high-society gala. The gems are worth **__${amount}__** coins on the black market.`,
                    `<a:tekcoin:1234188584664436778> You pull off a daring bank robbery with military precision, outsmarting the security systems and making off with **__${amount}__** coins in cash.`,
                    `<a:tekcoin:1234188584664436778> With nerves of steel, you stage a daring art heist during a high-profile museum exhibition. As the security guards scramble, you make off with **__${amount}__** coins in priceless masterpieces.`,
                    `<a:tekcoin:1234188584664436778> You orchestrate a daring heist on a luxury yacht, outmaneuvering the crew and making off with **__${amount}__** coins in cash and jewels.`,
                    `<a:tekcoin:1234188584664436778> You infiltrate a high-security government facility and steal top-secret documents. The intel is worth **__${amount}__** coins to the right buyer.`,
                    `<a:tekcoin:1234188584664436778> Posing as a famous archaeologist, you lead an expedition to uncover ancient treasures. Along the way, you help yourself to **__${amount}__** coins in priceless artifacts.`,
                    `<a:tekcoin:1234188584664436778> You orchestrate a daring heist on a luxury cruise ship, outmaneuvering the crew and making off with **__${amount}__** coins in cash and jewels.`,
                    `<a:tekcoin:1234188584664436778> You disguise yourself as a janitor and sneak into the bank after hours. With a carefully timed distraction, you crack the vault and walk away with **__${amount}__** coins in cash.`,
                    `<a:tekcoin:1234188584664436778> Using your skills as a master hacker, you breach the security of a major corporation and transfer **__${amount}__** coins to your offshore account.`,
                    `<a:tekcoin:1234188584664436778> You pose as a wealthy investor and convince a group of high-powered executives to invest in your fake company. With their money in hand, you disappear with **__${amount}__** coins in profits.`,
                    `<a:tekcoin:1234188584664436778> Posing as a delivery driver, you infiltrate a high-security warehouse and make off with **__${amount}__** coins worth of goods.`,
                    `<a:tekcoin:1234188584664436778> You orchestrate a sophisticated blackmail scheme, threatening to expose a politician's scandalous secrets unless they pay up. Your payout: **__${amount}__** coins in hush money.`,
                    `<a:tekcoin:1234188584664436778> With the help of an inside accomplice, you infiltrate a secure government facility and steal **__${amount}__** coins in classified documents.`,
                    `<a:tekcoin:1234188584664436778> You pose as a tourist and sneak onto a private island owned by a billionaire. While the guards are distracted, you help yourself to **__${amount}__** coins worth of luxury items.`,
                    `<a:tekcoin:1234188584664436778> Posing as a wealthy socialite, you attend a high-profile charity gala and discreetly pocket **__${amount}__** coins from the donation box.`,
                    `<a:tekcoin:1234188584664436778> With the help of a skilled locksmith, you break into a luxury penthouse and raid the safe for **__${amount}__** coins in cash and jewels.`,
                    `<a:tekcoin:1234188584664436778> You pose as a delivery driver and intercept a valuable shipment of goods. With your loot in tow, you make off with **__${amount}__** coins worth of merchandise.`,
                    `<a:tekcoin:1234188584664436778> Using your charm and wit, you seduce a wealthy heiress and convince her to transfer **__${amount}__** coins into your bank account.`,
                    `<a:tekcoin:1234188584664436778> Posing as a tech support specialist, you gain remote access to a billionaire's computer and transfer **__${amount}__** coins into your offshore account.`,
                    `<a:tekcoin:1234188584664436778> With the help of an expert forger, you create counterfeit passports and sell them to desperate travelers. Your profits: **__${amount}__** coins in untraceable cash.`,
                    `<a:tekcoin:1234188584664436778> You pose as a wealthy art collector and outbid the competition on a rare painting. After the auction, you sell it for **__${amount}__** coins to a private buyer.`,
                    `<a:tekcoin:1234188584664436778> Using your knowledge of the stock market, you manipulate prices and make a killing on a high-stakes trade. Your profits: **__${amount}__** coins in cold, hard cash.`,
                    `<a:tekcoin:1234188584664436778> You pose as a high-priced escort and seduce a wealthy businessman. After a night of passion, you discreetly help yourself to **__${amount}__** coins from his wallet.`,
                    `<a:tekcoin:1234188584664436778> Posing as a renowned art dealer, you broker a deal for a rare sculpture. After the sale, you pocket **__${amount}__** coins in commission fees.`,
                    `<a:tekcoin:1234188584664436778> With the help of a skilled team, you stage a daring heist on a luxury casino. Your take: **__${amount}__** coins in chips and cash.`,
                    `<a:tekcoin:1234188584664436778> You pose as a wealthy philanthropist and make a generous donation to a charity event. As a token of appreciation, they give you **__${amount}__** coins worth of luxury gifts.`,
                    `<a:tekcoin:1234188584664436778> With the help of an inside informant, you infiltrate a high-security research facility and steal **__${amount}__** coins worth of experimental technology.`,
                ];
                
                
                

                await userAccount.findOneAndUpdate({ userId: interaction.user.id }, { $inc: { walletbalance: amount } });

                const randomIndex = Math.floor(Math.random() * successfulCrimes.length);
                await interaction.editReply(successfulCrimes[randomIndex]);
            } else {

                amount = Math.floor(existingUser.walletbalance * (Math.random() * 0.10));
                const failedCrimes = [
                    `<a:tekcoin:1234188584664436778> Your attempt to rob the bank ends in disaster as you trip the silent alarm. You narrowly escape, but not before being fined **__${amount}__** coins. Better luck next time.`,
                    `<a:tekcoin:1234188584664436778> You try to break into the museum, but get stuck in the air vent halfway through. You're rescued by the fire department and fined **__${amount}__** coins for your trouble.`,
                    `<a:tekcoin:1234188584664436778> Your plan to steal a priceless artifact from the museum is foiled when you accidentally trip the security alarm. You escape, but not before being fined **__${amount}__** coins.`,
                    `<a:tekcoin:1234188584664436778> You attempt to rob the jewelry store, but your disguise fools no one. You're apprehended by the police and fined **__${amount}__** coins. Back to the drawing board.`,
                    `<a:tekcoin:1234188584664436778> Your attempt to hack into the bank's mainframe is thwarted by a firewall. You're traced by the authorities and fined **__${amount}__** coins for your trouble.`,
                    `<a:tekcoin:1234188584664436778> You try to pickpocket a wealthy businessman, but accidentally grab the mayor's wallet instead. You're caught red-handed and fined **__${amount}__** coins.`,
                    `<a:tekcoin:1234188584664436778> Your attempt to steal a car ends in disaster as you accidentally set off the alarm. You're chased down by the police and fined **__${amount}__** coins.`,
                    `<a:tekcoin:1234188584664436778> You try to pick the lock on a jewelry store, but end up breaking the key off inside. You're caught by the owner and fined **__${amount}__** coins.`,
                    `<a:tekcoin:1234188584664436778> Your attempt to shoplift from the supermarket is foiled when you accidentally trip and fall into a stack of cans. You're escorted out by security and fined **__${amount}__** coins.`,
                    `<a:tekcoin:1234188584664436778> You try to sneak into a concert without a ticket, but get caught by security. You're kicked out of the venue and fined **__${amount}__** coins.`,
                    `<a:tekcoin:1234188584664436778> Your attempt to break into a mansion ends in disaster when you accidentally set off the alarm. You're chased off by the owner's guard dogs and fined **__${amount}__** coins.`,
                    `<a:tekcoin:1234188584664436778> You try to steal a bike, but end up falling off and crashing into a dumpster. You're caught by the owner and fined **__${amount}__** coins.`,
                    `<a:tekcoin:1234188584664436778> Your attempt to rob a convenience store is foiled when the cashier presses the panic button. You're apprehended by the police and fined **__${amount}__** coins.`,
                    `<a:tekcoin:1234188584664436778> You try to sneak into a movie theater without paying, but get caught by an usher. You're kicked out of the theater and fined **__${amount}__** coins.`,
                    `<a:tekcoin:1234188584664436778> Your attempt to pickpocket a tourist fails when you accidentally drop your wallet in the process. You're caught by the police and fined **__${amount}__** coins.`,
                    `<a:tekcoin:1234188584664436778> You try to rob a bank, but the teller mistakes your water gun for a real one and hits the alarm. You're apprehended by the police and fined **__${amount}__** coins.`,
                    `<a:tekcoin:1234188584664436778> Your attempt to steal a car fails when you realize you can't hotwire it. You're caught by the owner and fined **__${amount}__** coins.`,
                    `<a:tekcoin:1234188584664436778> You try to break into a mansion, but get stuck in the chimney halfway through. You're rescued by firefighters and fined **__${amount}__** coins.`,
                    `<a:tekcoin:1234188584664436778> Your attempt to steal a car is thwarted when you realize it's a police cruiser. You're caught in the act and fined **__${amount}__** coins.`,
                    `<a:tekcoin:1234188584664436778> You try to rob a convenience store, but the cashier turns out to be an off-duty police officer. You're arrested on the spot and fined **__${amount}__** coins.`,
                    `<a:tekcoin:1234188584664436778> Your attempt to break into a mansion is interrupted by the owner's unexpected return. You flee the scene and are fined **__${amount}__** coins for trespassing.`,
                    `<a:tekcoin:1234188584664436778> You try to pickpocket a tourist, but they turn out to be an undercover cop. You're caught in the act and fined **__${amount}__** coins.`,
                    `<a:tekcoin:1234188584664436778> Your attempt to rob a bank is foiled when you accidentally lock yourself in the vault. You're rescued by police and fined **__${amount}__** coins.`,
                    `<a:tekcoin:1234188584664436778> You try to hack into a government database, but end up triggering a security alert. You're traced and fined **__${amount}__** coins for attempted cybercrime.`,
                    `<a:tekcoin:1234188584664436778> Your attempt to steal a priceless painting from the museum ends in disaster when you trip over the exhibit rope. You're caught by security and fined **__${amount}__** coins.`,
                    `<a:tekcoin:1234188584664436778> You try to break into a mansion, but the owner's dog chases you away. You're fined **__${amount}__** coins for disturbing the peace.`,
                    `<a:tekcoin:1234188584664436778> Your attempt to pickpocket a celebrity fails when their bodyguard catches you in the act. You're fined **__${amount}__** coins and banned from future events.`,
                    `<a:tekcoin:1234188584664436778> You try to rob a jewelry store, but accidentally trip the security alarm. You're caught by police and fined **__${amount}__** coins.`,
                    `<a:tekcoin:1234188584664436778> Your attempt to steal a car is thwarted when you realize it's a police cruiser. You're caught in the act and fined **__${amount}__** coins.`,
                    `<a:tekcoin:1234188584664436778> You try to rob a convenience store, but the cashier turns out to be an off-duty police officer. You're arrested on the spot and fined **__${amount}__** coins.`,
                    `<a:tekcoin:1234188584664436778> Your attempt to break into a mansion is interrupted by the owner's unexpected return. You flee the scene and are fined **__${amount}__** coins for trespassing.`,
                    `<a:tekcoin:1234188584664436778> You try to pickpocket a tourist, but they turn out to be an undercover cop. You're caught in the act and fined **__${amount}__** coins.`,
                    `<a:tekcoin:1234188584664436778> You try to rob a bank, but slip on a banana peel and knock yourself out. You wake up in handcuffs and are fined **__${amount}__** coins by the police.`,
                    `<a:tekcoin:1234188584664436778> Your attempt to steal a rare gem from a museum fails when you accidentally trigger an alarm. You're apprehended by security and fined **__${amount}__** coins.`,
                    `<a:tekcoin:1234188584664436778> You try to break into a mansion, but get tangled in a spider web and scream, alerting the owner. You're fined **__${amount}__** coins for disturbing the peace.`,
                    `<a:tekcoin:1234188584664436778> Your attempt to shoplift from a department store is thwarted when you accidentally walk out with the security tag still attached to your clothes. You're fined **__${amount}__** coins.`,
                    `<a:tekcoin:1234188584664436778> You try to rob a liquor store, but end up slipping on a spilled drink and knocking over a display. You're fined **__${amount}__** coins for the damages.`,
                    `<a:tekcoin:1234188584664436778> Your attempt to pickpocket a magician fails when they make your wallet disappear right before your eyes. You're fined **__${amount}__** coins for attempted theft.`,
                    `<a:tekcoin:1234188584664436778> You try to steal a bike, but accidentally pedal into a pond. You're fined **__${amount}__** coins for public nuisance and bike damage.`,
                    `<a:tekcoin:1234188584664436778> Your attempt to rob a convenience store is thwarted when you realize you left your mask at home. You're fined **__${amount}__** coins for being unprepared.`,
                    `<a:tekcoin:1234188584664436778> You try to break into a car, but it turns out to be a police sting operation. You're fined **__${amount}__** coins for attempted grand theft auto.`,
                    `<a:tekcoin:1234188584664436778> Your attempt to steal a rare artifact from a museum fails when you trip over a display case and set off an alarm. You're fined **__${amount}__** coins.`,
                    `<a:tekcoin:1234188584664436778> You try to pickpocket a tourist, but they turn out to be a professional wrestler. You're body-slammed to the ground and fined **__${amount}__** coins for your trouble.`,
                    `<a:tekcoin:1234188584664436778> Your attempt to rob a bank is foiled when you accidentally hand the teller your shopping list instead of a note. You're fined **__${amount}__** coins for the inconvenience.`,
                    `<a:tekcoin:1234188584664436778> You try to steal a rare coin from a collector, but end up dropping it down a drain. You're fined **__${amount}__** coins for the damage.`,
                    `<a:tekcoin:1234188584664436778> Your attempt to break into a mansion is interrupted by a swarm of bees. You're fined **__${amount}__** coins for trespassing and disturbing wildlife.`,
                    `<a:tekcoin:1234188584664436778> You try to rob a bakery, but slip on flour and land face-first in a cake. You're fined **__${amount}__** coins for the mess.`,
                    `<a:tekcoin:1234188584664436778> Your attempt to pickpocket a street performer fails when they catch you mid-performance. You're fined **__${amount}__** coins for disrupting their act.`,
                    `<a:tekcoin:1234188584664436778> You try to steal a rare book from a library, but trip over a stack of books and knock over a shelf. You're fined **__${amount}__** coins for the damages.`,
                    `<a:tekcoin:1234188584664436778> Your attempt to rob a toy store is thwarted when you accidentally activate a loud toy and draw attention to yourself. You're fined **__${amount}__** coins for the disturbance.`,
                    `<a:tekcoin:1234188584664436778> You try to break into an abandoned warehouse, but it turns out to be a police training exercise. You're fined **__${amount}__** coins for trespassing.`,
                    `<a:tekcoin:1234188584664436778> Your attempt to steal a painting from an art gallery fails when you accidentally trip an infrared beam. You're fined **__${amount}__** coins for triggering the alarm.`,
                ];
                
                
                const randomIndex = Math.floor(Math.random() * failedCrimes.length);
                await interaction.editReply(failedCrimes[randomIndex]);


                await userAccount.findOneAndUpdate({ userId: interaction.user.id }, { $inc: { walletbalance: -amount } });

                return true;

            }
        }
}