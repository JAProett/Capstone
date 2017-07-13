def e_coli_prediction(inter, water_temp, mean_water_temp,ph, ph_mean, dis, mean_dis, tur, mean_tur, amb_temp, mean_amb_temp,ds_rain, ds_rain_mean):
    watertemp_com = float(water_temp) * float(mean_water_temp)
    ph_com = float(ph) * float(ph_mean)
    dis_com = float(dis) * float(mean_dis)
    tur_com = float(tur) * float(mean_tur)
    ambtemp_com = float(amb_temp) * float(mean_amb_temp)
    dsrain_com = float(ds_rain) * float(ds_rain_mean)
    predic_ecoli = float(inter) + watertemp_com + ph_com + dis_com + tur_com + ambtemp_com + dsrain_com
    return predic_ecoli

def hi_value(std_firstpass, predic_ecoli):
    return  predic_ecoli + 2 * float(std_firstpass)
