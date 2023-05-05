import styles from "./Modules.module.scss";

function DCModule() {
  return (
    <div className={styles.moduleContainer}>
      <div className={styles.moduleHeader}>
        <h4>DC Adjustments</h4>
      </div>
      <div className={styles.moduleContent}>
        <table className={styles.dcTable}>
          <thead>
            <tr>
              <th>Difficulty</th>
              <th>Adjustment</th>
              <th>Rarity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Incredibly easy</td>
              <td>-10</td>
              <td>-</td>
            </tr>
            <tr>
              <td>Very easy</td>
              <td>-5</td>
              <td>-</td>
            </tr>
            <tr>
              <td>Easy</td>
              <td>-2</td>
              <td>-</td>
            </tr>
            <tr>
              <td>Hard</td>
              <td>+2</td>
              <td>Uncommon</td>
            </tr>
            <tr>
              <td>Very hard</td>
              <td>+5</td>
              <td>Rare</td>
            </tr>
            <tr>
              <td>Incredibly hard</td>
              <td>+10</td>
              <td>Unique</td>
            </tr>
          </tbody>
        </table>

        <h4>DCs by Level</h4>
        <table className={styles.dcTable}>
          <thead>
            <tr>
              <th>Level</th>
              <th>DC</th>
              <th>Spell Level*</th>
              <th>DC</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0</td>
              <td>14</td>
              <td>1st</td>
              <td>15</td>
            </tr>
            <tr>
              <td>1</td>
              <td>15</td>
              <td>2nd</td>
              <td>18</td>
            </tr>
            <tr>
              <td>2</td>
              <td>16</td>
              <td>3rd</td>
              <td>20</td>
            </tr>
            <tr>
              <td>3</td>
              <td>18</td>
              <td>4th</td>
              <td>23</td>
            </tr>
            <tr>
              <td>4</td>
              <td>19</td>
              <td>5th</td>
              <td>26</td>
            </tr>
            <tr>
              <td>5</td>
              <td>20</td>
              <td>6th</td>
              <td>28</td>
            </tr>
            <tr>
              <td>6</td>
              <td>22</td>
              <td>7th</td>
              <td>31</td>
            </tr>
            <tr>
              <td>7</td>
              <td>23</td>
              <td>8th</td>
              <td>34</td>
            </tr>
            <tr>
              <td>8</td>
              <td>24</td>
              <td>9th</td>
              <td>36</td>
            </tr>
            <tr>
              <td>9</td>
              <td>26</td>
              <td>10th</td>
              <td>39</td>
            </tr>
            <tr>
              <td>10</td>
              <td>27</td>
            </tr>
            <tr>
              <td>11</td>
              <td>28</td>
            </tr>
            <tr>
              <td>12</td>
              <td>30</td>
            </tr>
            <tr>
              <td>13</td>
              <td>31</td>
            </tr>
            <tr>
              <td>14</td>
              <td>32</td>
            </tr>
            <tr>
              <td>15</td>
              <td>34</td>
            </tr>
            <tr>
              <td>16</td>
              <td>35</td>
            </tr>
            <tr>
              <td>17</td>
              <td>36</td>
            </tr>
            <tr>
              <td>18</td>
              <td>38</td>
            </tr>
            <tr>
              <td>19</td>
              <td>39</td>
            </tr>
            <tr>
              <td>20</td>
              <td>40</td>
            </tr>
            <tr>
              <td>21</td>
              <td>42</td>
            </tr>
            <tr>
              <td>22</td>
              <td>44</td>
            </tr>
            <tr>
              <td>23</td>
              <td>46</td>
            </tr>
            <tr>
              <td>24</td>
              <td>48</td>
            </tr>
            <tr>
              <td>25</td>
              <td>50</td>
            </tr>
          </tbody>
        </table>
        <p>
          *If the spell is uncommon or rare, its difficulty should be adjusted
          accordingly
        </p>
      </div>
    </div>
  );
}

export default DCModule;
