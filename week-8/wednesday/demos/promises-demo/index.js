// V1 doesn't work
function openingCrawlBroken(time) {
    setTimeout(() => {
        console.log(`It is a period of civil war.
                     Rebel spaceships, striking
                     from a hidden base, have won
                     their first victory against
                     the evil Galactic Empire.`);
    }, time);
    setTimeout(() => {
        console.log(`During the battle, Rebel
                         spies managed to steal secret
                         plans to the Empire's
                         ultimate weapon, the DEATH
                         STAR, an armored space
                         station with enough power to
                         destroy an entire planet.`);
        
    }, time);
    setTimeout(() => {
        console.log(`Pursued by the Empire's
                             sinister agents, Princess
                             Leia races home aboard her
                             starship, custodian of the
                             stolen plans that can save
                             her people and restore
                             freedom to the galaxy....`);
    }, time);
}

// openingCrawlBroken(2000);
// V2 works but unreadable
function openingCrawlNested(time) {
    setTimeout(() => {
        console.log(`It is a period of civil war.
                     Rebel spaceships, striking
                     from a hidden base, have won
                     their first victory against
                     the evil Galactic Empire.`);
        setTimeout(() => {
            console.log(`During the battle, Rebel
                         spies managed to steal secret
                         plans to the Empire's
                         ultimate weapon, the DEATH
                         STAR, an armored space
                         station with enough power to
                         destroy an entire planet.`);
            setTimeout(() => {
                console.log(`Pursued by the Empire's
                             sinister agents, Princess
                             Leia races home aboard her
                             starship, custodian of the
                             stolen plans that can save
                             her people and restore
                             freedom to the galaxy....`);
            }, time);
        }, time);
    }, time);
}

// openingCrawlNested(2000);

// Wraps setTimeout with a Promise
function wait(ms) {
    return new Promise((res, rej) => {
        if (ms > 2000) {
            rej("I'm not waiting that long");
            return;
        }
        setTimeout(() => {
            res(ms);
        }, ms);
    });
}

// V3 with promise chaining
function openingCrawlChain(time) {
    wait(time)
        .then((receivedTime) => {
            receivedTime += 2000;
            console.log(`It is a period of civil war.
                     Rebel spaceships, striking
                     from a hidden base, have won
                     their first victory against
                     the evil Galactic Empire.`);
            return wait(receivedTime);
        })
        .then(() => {
            console.log(`During the battle, Rebel
                         spies managed to steal secret
                         plans to the Empire's
                         ultimate weapon, the DEATH
                         STAR, an armored space
                         station with enough power to
                         destroy an entire planet.`)
            return wait(time);
        })
        .then(() => {
            console.log(`Pursued by the Empire's
                             sinister agents, Princess
                             Leia races home aboard her
                             starship, custodian of the
                             stolen plans that can save
                             her people and restore
                             freedom to the galaxy....`);
        })
        .catch(e => console.log(e));
}

// openingCrawlChain(2000);
// V4 with async and await
async function openingCrawlAsync(time) {
    try {
        let receivedTime = await wait(time);
        console.log(receivedTime);
        console.log(`It is a period of civil war.
                    Rebel spaceships, striking
                    from a hidden base, have won
                    their first victory against
                    the evil Galactic Empire.`);
        receivedTime += 2000;
        await wait(receivedTime);
        console.log(`During the battle, Rebel
                        spies managed to steal secret
                        plans to the Empire's
                        ultimate weapon, the DEATH
                        STAR, an armored space
                        station with enough power to
                        destroy an entire planet.`)
        await wait(time);
        console.log(`Pursued by the Empire's
                            sinister agents, Princess
                            Leia races home aboard her
                            starship, custodian of the
                            stolen plans that can save
                            her people and restore
                            freedom to the galaxy....`);
    } catch (e) {
        console.log(e);
        openingCrawlAsync(0);
    }
}

openingCrawlAsync(2000);