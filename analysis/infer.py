import pandas as pd
from tensorflow import keras

def predict(model_path, rows):
    model = keras.models.load_model(f'{model_path}/model')
    feature_params = pd.read_csv(f'{model_path}/features_params.csv', index_col=0)
    features = rows[feature_params.index]
    for feature_name in feature_params.index:
        features[feature_name] = rows[feature_name].fillna(feature_params['default'][feature_name])
    features_norm = (features - feature_params['mean']) / feature_params['std']
    return model.predict(features_norm)

def main():
    # @TODO: Read and write to database from ENV

    supplier_rows = pd.read_csv('../output_data/TrainingDataset v6.csv', sep=';')
    supplier_predicted = pd.DataFrame({}, index=supplier_rows.index)
    supplier_predicted['inn'] = supplier_rows['INN']
    supplier_predicted['SupplierRating'] = predict('../models/supplier', supplier_rows)
    supplier_predicted = supplier_predicted.set_index('inn')

    customer_rows = pd.read_csv('../output_data/TrainingDatasetCustomer v1.csv', sep=';')
    customer_predicted = pd.DataFrame({}, index=customer_rows.index)
    customer_predicted['inn'] = customer_rows['inn']
    customer_predicted['CustomerRating'] = predict('../models/customer', customer_rows)
    customer_predicted = customer_predicted.set_index('inn')

    predicted = pd.merge(supplier_predicted, customer_predicted, on='inn', how='outer')
    predicted.to_csv('../output_data/predicted.csv')

if __name__ == "__main__":
    main()