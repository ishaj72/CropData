from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/api/tables')
def get_tables():
    # Load the data
    data = pd.read_csv("E:/MyApps/CropData/flask-server/Dataset/ManufacIndiaAgroDataset.csv")
    
    # Data cleaning and processing
    data['Crop Production (UOM:t(Tonnes))'] = data['Crop Production (UOM:t(Tonnes))'].fillna(0)
    data['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))'] = data['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))'].fillna(0)
    data['Area Under Cultivation (UOM:Ha(Hectares))'] = data['Area Under Cultivation (UOM:Ha(Hectares))'].fillna(0)
    
    # Group data by year and find max and min production crops
    year_group = data.groupby('Year')[['Crop Production (UOM:t(Tonnes))']].agg(['max', 'min']).reset_index()
    year_group.columns = ['Year', 'MaxProd', 'MinProd']
    
    # Merge with original data to get crop names
    merged_max = pd.merge(year_group, data, left_on=['Year', 'MaxProd'], right_on=['Year', 'Crop Production (UOM:t(Tonnes))'])
    merged_min = pd.merge(year_group, data, left_on=['Year', 'MinProd'], right_on=['Year', 'Crop Production (UOM:t(Tonnes))'])
    
    final_table = pd.DataFrame({
        'Year': merged_max['Year'],
        'CropWithMaxProd': merged_max['Crop Name'],
        'CropWithMinProd': merged_min['Crop Name']
    })
    
    # Calculating the average value and rounding off for 3 digits
    average_yield = data.groupby('Crop Name')['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))'].mean().round(3)
    average_cultivation_area = data.groupby('Crop Name')['Area Under Cultivation (UOM:Ha(Hectares))'].mean().round(3)
    
    final_table2 = pd.DataFrame({
        'Crop Name': average_yield.index,
        'Average Yield (Kg/Ha)': average_yield.values,
        'Average Cultivation Area (Ha)': average_cultivation_area.values
    })
    
    # Return the processed data as JSON
    result = {
        "final_table": final_table.to_dict(orient="records"),
        "final_table2": final_table2.to_dict(orient="records")
    }

    print("Resulting data structure:", result)  # Debugging statement

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
