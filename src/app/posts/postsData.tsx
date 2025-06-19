import React from 'react';
import Image from 'next/image';

export interface PostData {
  title: string;
  date: string;
  content: React.ReactNode;
  code: React.ReactNode;
}

export const posts: { [key: string]: PostData } = {
  'sample-post': {
    title: "Matt Chapman's 2025 Performance",
    date: "June 9, 2025",
    content: (
      <>
        <p>Matt Chapman&apos;s baseline statistics this year are a bit confusing. His batting average is essentially the league average, he leads the Giants with 12 home runs, which is tied for 28th in the league. He is obviously one of the best fielders in baseball.</p>
        <p>All things considered, he is having a great year. Interestingly, he is 8th in baseball in WAR at 2.9. Meanwhile, he isn&apos;t top ten in any other offensive category aside from walks.</p>
        <p>So what&apos;s the deal? How is it that Chapman is top 10 in value, but doesn&apos;t have the flashy stats to show for it?</p>
        <Image src="/images/chapman-batting-average-2025.png" alt="Matt Chapman&apos;s Batting Average vs. MLB Average (2025)" width={600} height={300} style={{ margin: '2rem auto', display: 'block', maxWidth: '100%' }} />
        <p>As we can see from the chart above Chapman&apos;s batting average is approaching the league average. The regression also tends toward Chapman&apos;s career average, 241.</p>
        <Image src="/images/chapman-obp-2025.png" alt="Matt Chapman&apos;s OBP vs. MLB Average (2025)" width={600} height={300} style={{ margin: '2rem auto', display: 'block', maxWidth: '100%' }} />
        <br />
        
        <p>It is clear that Chapman is getting on base at a higher rate than the league average. And Billy Beane would assure us that this 
            is far more valuable than any other hitting statistic. 
        </p>
        <br />
        <p>
           If we look deeper into chapmans statistics relative to the league we can see where he&apos;s creating value.
        </p>
        <Image src="/images/chapman-batting.png" alt="Matt Chapman&apos;s wOBA vs. MLB Average (2025)" width={600} height={300} style={{ margin: '2rem auto', display: 'block', maxWidth: '100%' }} />
        <br />
        <p>
            Chapman is hitting the ball hard, and he&apos;s walking a lot. If I was a pitcher, this isn&apos;t a guy I&apos;d want to see.
            He&apos;s got the speed to bat leadoff, the power to bat third, and the ability to break any game open.          
        </p>
        <br /> 
        <ul>
          <li>His average exit velocity 94mph which is 11th in the league.</li>
          <li>His xwOBA is 374 which is 30th in the league.</li>
          <li>He&apos;s one of the best fielding third baseman of all time.</li>
          <li>His 28.2 sprint speed is quick for the league average</li>
          <li>He has a cannon from third</li>
        </ul>
        <br />
        <p> Matt chapman is absolutely a 5 tool player. His value comes from his ability to do all things 
            on a baseball field, and to do them damn well.
        </p>
        <br />
        <p>
            The Giants are lucky to have him.
        </p>
      </>
    ),
    code: (
      <pre>
        <code>
{`import requests
import pandas as pd
import matplotlib.pyplot as plt

# Step 1: Set date range
start_date = "2025-03-28"
end_date = "2025-06-08"

# Step 2: Get Giants schedule
schedule_url = f"https://statsapi.mlb.com/api/v1/schedule?teamId=137&startDate={start_date}&endDate={end_date}&sportId=1"
schedule = requests.get(schedule_url).json()

# Step 3: Collect completed game IDs
games = []
for date in schedule['dates']:
    for game in date['games']:
        if game['status']['codedGameState'] in ['F', 'O']:
            games.append((game['gamePk'], game['gameDate'][:10]))

# Step 4: Get Matt Chapman game-by-game stats
chapman_stats = []

for game_id, game_date in games:
    box_url = f"https://statsapi.mlb.com/api/v1/game/{game_id}/boxscore"
    box = requests.get(box_url).json()
    found = False
    for side in ['home', 'away']:
        for player_data in box['teams'][side]['players'].values():
            if player_data['person']['fullName'] == "Matt Chapman":
                batting = player_data.get('stats', {}).get('batting', {})
                chapman_stats.append({
                    'date': game_date,
                    'atBats': batting.get('atBats', 0),
                    'plate_appearances': batting.get('plateAppearances', 0),
                    'hits': batting.get('hits', 0),
                    'walks': batting.get('baseOnBalls', 0)
                })
                found = True
                break
        if found:
            break


# Step 5: Create Matt Chapman AVG series
df_chapman = pd.DataFrame(chapman_stats)
df_chapman['date'] = pd.to_datetime(df_chapman['date'])
df_chapman['cum_hits'] = df_chapman['hits'].cumsum()
df_chapman['cum_walks'] = df_chapman['walks'].cumsum()
df_chapman['cum_PA'] = df_chapman['plate_appearances'].cumsum()
df_chapman['cum_atBats'] = df_chapman['atBats'].cumsum()
df_chapman['AVG'] = df_chapman['cum_hits'] / df_chapman['cum_atBats']
df_chapman['OBP'] = (df_chapman['cum_hits'] + df_chapman['cum_walks']) / df_chapman['cum_PA']

league_avg = 0.244

# Plotting ba with league average
plt.figure(figsize=(10, 5))
plt.plot(df['date'], df['AVG'], marker='o', label="Matt Chapman")
plt.axhline(y=league_avg, color='red', linestyle='--', label="MLB AVG (.244)")
plt.title("Matt Chapman&apos;s Batting Average vs. MLB Average (2025)")
plt.xlabel("Date")
plt.ylabel("Batting Average")
plt.legend()
plt.grid(True)
plt.tight_layout()
plt.show()

# League OBP average (manual input for now)
league_obp = 0.312

# Plot obp w league average
plt.figure(figsize=(10, 5))
plt.plot(df_chapman['date'], df_chapman['OBP'], marker='o', label="Matt Chapman OBP")
plt.axhline(league_obp, color='red', linestyle='--', label="MLB OBP AVG (.312)")
plt.title("Matt Chapman&apos;s On-Base Percentage vs. MLB Average (2025)")
plt.xlabel("Date")
plt.ylabel("On-Base Percentage")
plt.legend()
plt.grid(True)
plt.tight_layout()
plt.show()

player_data = pd.read_csv("player_stats.csv")
# League averages 
league_averages = {
    'wOBA': 0.320,
    'xwOBA': 0.330,
    'K%': 22.0,
    'BB%': 8.5,
    'Barrel%': 6.7,
    'Hard Hit%': 39.0,
    'Sweet Spot%': 32.0,
    'Whiff%': 24.0,
    'Swing%': 47.0
}

# Matt Chapman&apos;s values from the data
chapman_stats = {
    'wOBA': 0.360,
    'xwOBA': 0.374,
    'K%': 23.9,
    'BB%': 14.7,
    'Barrel%': 10.9,
    'Hard Hit%': 52.1,
    'Sweet Spot%': 33.9,
    'Whiff%': 25.1,
    'Swing%': 41.2
}

# Split stats into two groups for clarity
value_metrics = ['wOBA', 'xwOBA']
percent_metrics = ['K%', 'BB%', 'Barrel%', 'Hard Hit%', 'Sweet Spot%', 'Whiff%', 'Swing%']

# Prepare data
chapman_values_1 = [chapman_stats[m] for m in value_metrics]
league_values_1 = [league_averages[m] for m in value_metrics]

chapman_values_2 = [chapman_stats[m] for m in percent_metrics]
league_values_2 = [league_averages[m] for m in percent_metrics]

# Create subplots
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 5))

# Plot wOBA and xwOBA
x1 = range(len(value_metrics))
ax1.bar([i - 0.2 for i in x1], chapman_values_1, width=0.4, label="Matt Chapman")
ax1.bar([i + 0.2 for i in x1], league_values_1, width=0.4, label="MLB Average")
ax1.set_xticks(x1)
ax1.set_xticklabels(value_metrics)
ax1.set_title("wOBA & xwOBA")
ax1.set_ylabel("Value")
ax1.legend()
ax1.grid(True, axis='y', linestyle='--', alpha=0.7)

# Plot percentages
x2 = range(len(percent_metrics))
ax2.bar([i - 0.2 for i in x2], chapman_values_2, width=0.4, label="Matt Chapman")
ax2.bar([i + 0.2 for i in x2], league_values_2, width=0.4, label="MLB Average")
ax2.set_xticks(x2)
ax2.set_xticklabels(percent_metrics, rotation=45)
ax2.set_title("Statcast Percent Metrics")
ax2.set_ylabel("Percentage")
ax2.legend()
ax2.grid(True, axis='y', linestyle='--', alpha=0.7)

plt.suptitle("Matt Chapman vs. MLB Averages (2025 Statcast Metrics)", fontsize=14)
plt.tight_layout(rect=[0, 0, 1, 0.95])
plt.show()

`}
        </code>
      </pre>
    )
  },
  'new-post': {
    title: "Giants Trade Deadline Analysis",
    date: "June 13, 2025",
    content: (
      <>
          <h2>The most fundamental question we must ask: buy or sell?</h2>

            <p>
            Buster&apos;s first season got off to a piping hot start, and relative to what we&apos;ve achieved in the last couple years, I&apos;m pretty excited. 
            Albeit, if we separate out the performance of players who Buster has signed in his tenure as Head of Baseball Operations, it is rather disappointing — thanks Willy.
            </p>
            <br />
            <p>
            He did have a role in signing Chapman, extending Webb, and signing Jung Hoo Lee. Buster also avoided some big-name pitching who now have serious injury concerns.
            </p>
            <br />  
            <p>
            The real winner for this Giants team has been the arms. The starting rotation is competing at an incredible level. Webb and Ray have been amazing. 
            Harrison, Birdsong, and Roupe all show great promise. The bullpen has been the best in baseball. Shoutout Randy Rodriguez.
            </p>
            <br />
            <p>
            The bats have done just barely enough to win games. The Giants have won their last 6 games by one run. One thing they&apos;ve shown they can do as good as any team in baseball is come back from behind.
            </p>
            <br />
            <p>
            The reality of the buy/sell question: with this staff and bullpen, you have to buy. Buster Posey has brought life to San Francisco and historically that&apos;s the most fundamental ingredient — 
            along with the legendary staff that brought 3 World Series titles to SF.
            </p>
            <br />
            <h3>So where do we need to buy?</h3>
            <br />
            <p>
            The first thing I&apos;ll say is we have a few restrictions. To be more specific, Willy Adames&apos; contract and Pat Bailey&apos;s glove. 
            So we won&apos;t be looking at a shortstop or catcher even though those have been large offensive holes.
            </p>
            <br />
            <p>
            The most blaring gap has been first base; and don&apos;t get me wrong, Dom Smith has Giants baseball written all over him, 
            but to contend, the Giants need some serious positive run value — and this is the obvious place.
            </p>
            <br />
            <p>
            Here is the xwOBA (Expected Weighted On-base Average) for first basemen in baseball. Those labeled are on teams that are below .500. They are, in theory, sellers.
            </p>
            <br />

            <Image src="/images/first_base_xwOBA.png" alt="First Base xwOBA" width={600} height={300} style={{ margin: '2rem auto', display: 'block', maxWidth: '100%' }} />
            <br />
            <p><em>
            Keep in mind that the requirement to be considered is having played more than a game at first base this season, 
            so there are some players not typically thought of as first basemen here. It&apos;s time to get creative so we will consider them.
            </em></p>
            <br />
            <h4>Possible players:</h4>
            <p>
            Nolan Schanuel, Josh Bell, Eric Wagaman, Josh Naylor, Lenyn Sosa, Hunter Goodman, Lourdes Gurriel Jr., Ryan McMahon, Josh Smith, 
            Matt Olson, Miguel Vargas, Jake Burger, Ryan O&apos;Hearn, Nathaniel Lowe, Tyler Soderstrom, Austin Riley, Taylor Ward
            </p>
            <br />
            <p>
            Let&apos;s take out some names I think aren&apos;t possible: Josh Naylor, Lourdes Gurriel, Matt Olson, Austin Riley, and Tyler Soderstrom.
            </p>
            <br />
            <p>
            Ryan O&apos;Hearn quickly becomes the far and away best candidate to fill the Giants&apos; hole. Let&apos;s take a deeper dive into O&apos;Hearn, 
            but we won&apos;t get fixated (as any Giants fan knows, he&apos;s far too good of a fit for us to actually get him).
            </p>
            <br />
            <p>
            O&apos;Hearn is a lefty hitter with some pop and some speed. He has played a ton of positions this year with over 100 innings at 1B and RF. 
            So, he has the ability to play outfield if Bryce Eldridge is called up at some point this year.
            </p>
            <br />
            <h4>Potential lineup with O&apos;Hearn:</h4>
            <ul>
            <li>JHL (been a beast at the leadoff spot)</li>
            <li>Willy Adames (heating up)</li>
            <li>Heliot Ramos (dawg)</li>
            <li>Ryan O&apos;Hearn (dawg)</li>
            <li>Matt Chapman (see above)</li>
            <li>Eldridge</li>
            <li>Wilmer (RBI machine)</li>
            <li>Pat Bailey (starting to see it)</li>
            <li>Fitzy (bunt)</li>
            </ul>
      </>
    ),
    code: (
      <pre>
        <code>
{`# def get_losing_teams():
    """Return a set of team IDs with losing records (win% < .500)."""
    url = "https://statsapi.mlb.com/api/v1/standings?leagueId=103,104&season=2025&standingsTypes=regularSeason"
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        records = data['records']
        
        losing_teams = set()
        for division in records:
            for team_record in division['teamRecords']:
                team_id = team_record['team']['id']
                wins = team_record['wins']
                losses = team_record['losses']
                if wins + losses > 0 and wins / (wins + losses) < 0.500:
                    losing_teams.add(team_id)
        return losing_teams
    except Exception as e:
        print(f"Error fetching standings: {e}")
        return set()

# Get list of losing team IDs


def has_played_first_base(player_id):
    url = f"https://statsapi.mlb.com/api/v1/people/{player_id}/stats?stats=career&group=fielding"
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        splits = data['stats'][0]['splits']
        for split in splits:
            position = split.get('position', {}).get('abbreviation')
            if position == '1B':
                games = int(split['stat'].get('games', 0))
                if games > 0:
                    return True
        return False
    except Exception as e:
        print(f"Error fetching fielding stats for player {player_id}: {e}")
        return False


    import requests

def get_team_id(player_id):
    player_id = int(player_id)
    url = f'https://statsapi.mlb.com/api/v1/people/{player_id}?hydrate=rosterEntries'
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        entries = data['people'][0].get('rosterEntries', [])
        if entries:
            return entries[0]['team']['id']
        else:
            print(f"No team found for player {player_id}")
            return None
    except Exception as e:
        print(f"Error fetching team for player {player_id}: {e}")
        return None


    !pip install MLB-StatsAPI
import statsapi
import pandas as pd
import matplotlib.pyplot as plt




#pull first baseman from data
player_stats = pd.read_csv("player_stats.csv")

first_baseman = []
for _, row in player_stats.iterrows():
    if has_played_first_base(row['player_id']):
        first_baseman.append(row)


first_baseman_df = pd.DataFrame(first_baseman)

# Add Dom Smith to the DataFrame
dom_row = pd.DataFrame({
    'last_name, first_name': ['Smith, Dominic'],
    'player_id' : 642086,
    'xwoba': [0.245]
})
first_baseman_df = pd.concat([first_baseman_df, dom_row], ignore_index=True)




first_baseman_df = first_baseman_df[first_baseman_df['last_name, first_name'] != 'Flores, Wilmer']
first_baseman_df['team_id'] = first_baseman_df['player_id'].apply(get_team_id)

# Get losing team IDs
losing_team_ids = get_losing_teams()
losing_team_ids.add(137)


# Colors
colors = [
    'black' if name.strip() == 'Smith, Dominic' else 'orange'
    for name in first_baseman_df['last_name, first_name']
]


# Calculate league average xwOBA
league_avg = first_baseman_df['xwoba'].mean()

#  Create bar chart
plt.figure(figsize=(10, 8))
bars = plt.bar(first_baseman_df['last_name, first_name'], first_baseman_df['xwoba'], color=colors)

# Draw average line
plt.axhline(y=league_avg, color='gray', linestyle='--', linewidth=1)
plt.text(
    x=len(first_baseman_df) - 0.5,
    y=league_avg + 0.005,
    s=f'League Avg: {league_avg:.3f}',
    color='gray',
    ha='right',
    fontsize=9,
    rotation = 90
)

# Hide x-axis tick labels
plt.xticks([], [])

# Label only players on losing teams
for bar, (_, row) in zip(bars, first_baseman_df.iterrows()):
    if row['team_id'] in losing_team_ids:
        x = bar.get_x() + bar.get_width() / 2
        y = bar.get_height()
        plt.text(x, y + 0.005, row['last_name, first_name'], ha='center', fontsize=8, rotation = 90)

# Style
plt.title('xwOBA by First Basemen (Labeling Players on Losing Teams)')
plt.ylabel('xwOBA')
plt.tight_layout()
plt.show()



`}
        </code>
      </pre>
    )
  },
  'rafael-devers': {
    title: "Rafeal F-ing Devers",
    date: "June 16, 2025",
    content: (
        <>
        <p>
          I grew up with a Buster Posey fathead on my wall, but I don't think I've ever been more fired up about him than I am now.
        </p>
        <br />  
        <p>
          Yes, the Giants gave up some upside arms. Yes, this is now the largest contract in franchise history. But I love it.
        </p>
        <br />
        <p>
          I love the timing — no more waiting until late July to start winning or investing. <br />
          I love the message — this front office is saying loud and clear: <strong>we're going for it</strong>. <br />
          I love the buzz — the last time the Giants were dominating national headlines like this was 2014.
        </p>
        <br />
        <h2>Let's dive into Raffy.</h2>
        <p>Here's a chart of the results of his 334 plate appearances this season:</p>
        <br />
        <Image src="/images/raffy-pie.png" alt="Rafael Devers Chart" width={600} height={300} style={{ margin: '2rem auto', display: 'block', maxWidth: '100%' }} />
        <br />
        <p>
          Rafael Devers gets on base in about <strong>40% of his at-bats</strong>, well above the Giants' team average of <strong>31%</strong>. He immediately becomes the team's <strong>home run leader</strong> with 15 — and that's just the beginning. He now leads the Giants in:
        </p>
        <br />
        <ul>
          <li><strong>OPS</strong></li>
          <li><strong>RBIs</strong></li>
          <li><strong>Walks</strong></li>
          <li><strong>Doubles</strong></li>
        </ul>
        <br />
        <p>He's not just a big bat — he's the biggest in orange and black.</p>
        <br />
        <h1>The Lefty Effect</h1>
        <br />
        <p>
          Devers is even more valuable given the Giants' current lefty situation. Among left-handed hitters — Mike Yastrzemski, Patrick Bailey, Daniel Johnson, Jung Hoo Lee, and Dom Smith — only Dom has an OPS over .800, and he's had just 35 at-bats.
        </p>
        <p>
          Remove Dom, and the <strong>average OPS for Giants lefties is .698</strong>. Devers? <strong>.905.</strong>
        </p>
        <br />
        <p>
          Time to get the kayaks out in McCovey Cove — Raffy's going to make waves.
        </p>
      </>
    ),
    code: (
      <pre>
        <code>
{`# 
    !pip install MLB-StatsAPI
import statsapi
import pandas as pd
import matplotlib.pyplot as plt


df = statsapi.player_stat_data(646240)
raffy = pd.DataFrame(df)
print(raffy['stats'][0])
doubles = raffy["stats"][0]["stats"]["doubles"]
hrs = raffy["stats"][0]["stats"]["homeRuns"]
triples = raffy["stats"][0]["stats"]["triples"]
singles = raffy["stats"][0]["stats"]["hits"] - doubles - hrs - triples
walks = raffy["stats"][0]["stats"]["baseOnBalls"]
groundOuts = raffy["stats"][0]["stats"]["groundOuts"]
airOuts = raffy["stats"][0]["stats"]["airOuts"]
PAs = raffy["stats"][0]["stats"]["plateAppearances"]
strikeouts = raffy["stats"][0]["stats"]["strikeOuts"]

other = raffy["stats"][0]["stats"]["hitByPitch"]

labels = ['Singles', 'Doubles', 'Home Runs', 'Walks', 'Ground Outs', 'Air Outs', 'Ks']
values = [singles, doubles, hrs, walks, groundOuts, airOuts, strikeouts]

colors = [
    '#4A90E2',  # Singles (blue)
    '#5DADE2',  # Doubles (lighter blue)
    '#2E86C1',  # Home Runs (dark blue)
    '#3498DB',  # Walks (mid blue)
    '#E74C3C',  # Ground Outs (red)
    '#C0392B',   # Air Outs (dark red)
    '#A93226'   # Strikeouts (darker red)
]

# Plot pie chart with color mapping
plt.figure(figsize=(8, 8))
plt.pie(values, labels=labels, autopct='%1.1f%%', startangle=140, colors=colors)
plt.title("Rafael Devers – At Bat Outcomes")
plt.tight_layout()
plt.show()




# average lefty ops
yaz = pd.DataFrame(statsapi.player_stat_data(573262))
dj = pd.DataFrame(statsapi.player_stat_data(669288))
jhl = pd.DataFrame(statsapi.player_stat_data(808982))
pat = pd.DataFrame(statsapi.player_stat_data(672275))

def get_ops(df):
    for stat_entry in df["stats"]:
        if "ops" in stat_entry.get("stats", {}):
            return stat_entry["stats"]["ops"]
    return None # Return None if ops is not found in any stat entry


avg_ops = (float(get_ops(yaz)) + float(get_ops(dj)) + float(get_ops(pat)) + float(get_ops(jhl))) / 4
print(avg_ops)




#`}
        </code>
      </pre>
    )
  }
} 