def e_coli_prediction(inter, water_temp, mean_water_temp,
ph, ph_mean, dis, mean_dis, tur, mean_tur, amb_temp, mean_amb_temp,
ds_rain, ds_rain_mean):
    watertemp_com = water_temp * mean_water_temp
    ph_com = ph * ph_mean
    dis_com = dis * mean_dis
    tur_com = tur * mean_tur
    ambtemp_com = amb_temp * mean_amb_temp
    dsrain_com = ds_rain * ds_rain_mean

    predic_ecoli = inter + watertemp_com + ph_com + dis_com + tur_com + ambtemp_com + dsrain_com
    # return predic_ecoli

def hi_value(std_firstpass, predic_ecoli):
    # return  predic_ecoli + 2 * std_firstpass
