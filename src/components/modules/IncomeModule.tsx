import styles from "./Modules.module.scss";
import CollapsibleHeader from "../headers/CollapsibleHeader";


function IncomeModule() {
  return (
      <>
        <CollapsibleHeader className={styles.moduleContainer} title="Income Earned" toggle>

          <div className={styles.moduleContent}>
            <table className={styles.dcTable}>
              <thead>
                <tr>
                  <th>Task Level</th>
                  <th>DC</th>
                  <th>Failed</th>
                  <th>Trained</th>
                  <th>Expert</th>
                  <th>Master</th>
                  <th>Legendary</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0</td>
                  <td>14</td>
                  <td>1 cp</td>
                  <td>5 cp</td>
                  <td>5 cp</td>
                  <td>5 cp</td>
                  <td>5 cp</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>15</td>
                  <td>2 cp</td>
                  <td>2 sp</td>
                  <td>2 sp</td>
                  <td>2 sp</td>
                  <td>2 sp</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>16</td>
                  <td>4 cp</td>
                  <td>3 sp</td>
                  <td>3 sp</td>
                  <td>3 sp</td>
                  <td>3 sp</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>18</td>
                  <td>8 cp</td>
                  <td>5 sp</td>
                  <td>5 sp</td>
                  <td>5 sp</td>
                  <td>5 sp</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>19</td>
                  <td>1 sp</td>
                  <td>7 sp</td>
                  <td>8 sp</td>
                  <td>8 sp</td>
                  <td>8 sp</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>20</td>
                  <td>2 sp</td>
                  <td>9 sp</td>
                  <td>1 gp</td>
                  <td>1 gp</td>
                  <td>1 gp</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>22</td>
                  <td>3 sp</td>
                  <td>1 gp, 5 sp</td>
                  <td>2 gp</td>
                  <td>2 gp</td>
                  <td>2 gp</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>23</td>
                  <td>4 sp</td>
                  <td>2 gp</td>
                  <td>2 gp, 5 sp</td>
                  <td>2 gp, 5 sp</td>
                  <td>2 gp, 5 sp</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>24</td>
                  <td>5 sp</td>
                  <td>2 gp, 5 sp</td>
                  <td>3 gp</td>
                  <td>3 gp</td>
                  <td>3 gp</td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>26</td>
                  <td>6 sp</td>
                  <td>3 gp</td>
                  <td>4 gp</td>
                  <td>4 gp</td>
                  <td>4 gp</td>
                </tr>
                <tr>
                  <td>10</td>
                  <td>27</td>
                  <td>7 sp</td>
                  <td>4 gp</td>
                  <td>5 gp</td>
                  <td>6 gp</td>
                  <td>6 gp</td>
                </tr>
                <tr>
                  <td>11</td>
                  <td>28</td>
                  <td>8 sp</td>
                  <td>5 gp</td>
                  <td>6 gp</td>
                  <td>8 gp</td>
                  <td>8 gp</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>30</td>
                  <td>9 sp</td>
                  <td>6 gp</td>
                  <td>8 gp</td>
                  <td>10 gp</td>
                  <td>10 gp</td>
                </tr>
                <tr>
                  <td>13</td>
                  <td>31</td>
                  <td>1 gp</td>
                  <td>7 gp</td>
                  <td>10 gp</td>
                  <td>15 gp</td>
                  <td>15 gp</td>
                </tr>
                <tr>
                  <td>14</td>
                  <td>32</td>
                  <td>1 gp, 5 sp</td>
                  <td>8 gp</td>
                  <td>15 gp</td>
                  <td>20 gp</td>
                  <td>20 gp</td>
                </tr>
                <tr>
                  <td>15</td>
                  <td>34</td>
                  <td>2 gp</td>
                  <td>10 gp</td>
                  <td>20 gp</td>
                  <td>28 gp</td>
                  <td>28 gp</td>
                </tr>
                <tr>
                  <td>16</td>
                  <td>35</td>
                  <td>2 gp, 5 sp</td>
                  <td>13 gp</td>
                  <td>25 gp</td>
                  <td>36 gp</td>
                  <td>40 gp</td>
                </tr>
                <tr>
                  <td>17</td>
                  <td>36</td>
                  <td>3 gp</td>
                  <td>15 gp</td>
                  <td>30 gp</td>
                  <td>45 gp</td>
                  <td>55 gp</td>
                </tr>
                <tr>
                  <td>18</td>
                  <td>38</td>
                  <td>4 gp</td>
                  <td>20 gp</td>
                  <td>45 gp</td>
                  <td>70 gp</td>
                  <td>90 gp</td>
                </tr>
                <tr>
                  <td>19</td>
                  <td>39</td>
                  <td>6 gp</td>
                  <td>30 gp</td>
                  <td>60 gp</td>
                  <td>100 gp</td>
                  <td>130 gp</td>
                </tr>
                <tr>
                  <td>20</td>
                  <td>40</td>
                  <td>8 gp</td>
                  <td>40 gp</td>
                  <td>75 gp</td>
                  <td>150 gp</td>
                  <td>200 gp</td>
                </tr>
                <tr>
                  <td>20*</td>
                  <td>—</td>
                  <td>—</td>
                  <td>50 gp</td>
                  <td>90 gp</td>
                  <td>175 gp</td>
                  <td>300 gp</td>
                </tr>
              </tbody>
            </table>
          <p>
          *Critical success
          </p>
          </div>
        </CollapsibleHeader>
      </>
);
}

export default IncomeModule;
