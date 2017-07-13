import sqlalchemy
from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
import pandas as pd
from sqlalchemy.orm import sessionmaker

engine = sqlalchemy.create_engine('postgresql://jamesdev:jamesp123@localhost/water_qual', echo=True)

Base = declarative_base()

class Site(Base):
    __tablename__ = 'sites'
    id = Column(Integer, primary_key=True)
    SITE_NAME = Column(String)
    M_Result = Column(Float)
    M_Error = Column(Float)
    M_WT_Result = Column(Float)
    M_PH_Result = Column(Float)
    M_DIS_Result = Column(Float)
    M_TUR_Result = Column(Float)
    M_DS_Rain = Column(Float)
    M_Temp = Column(Float)
    N = Column(Float)
    E_STD = Column(Float)
    R2 = Column(Float)
    R22 = Column(Float)
    PARM_INTERCIP = Column(Float)
    tSTAT_INTERCIP = Column(Float)
    PARM_WT = Column(Float)
    tSTAT_WT = Column(Float)
    PARM_PH = Column(Float)
    tSTAT_PH = Column(Float)
    PARM_DIS = Column(Float)
    tSTAT_DIS = Column(Float)
    PARM_TUR = Column(Float)
    tSTAT_TUR = Column(Float)
    PARM_DS_Rain = Column(Float)
    tSTAT_DS_Rain = Column(Float)
    PARM_AMB_TEMP = Column(Float)
    tSTAT_AMB_TEMP = Column(Float)
    LAT_DD_WGS84 = Column(Float)
    LON_DD_WGS84 = Column(Float)



#
# data = pd.read_csv('../assets/EcoliOut2.csv', index_col=False)
# data.to_sql(name='sites', con=engine, if_exists='append')
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)
session = Session()

def get_all_loc():
    locations_all = []
    for SITE_NAME, LAT_DD_WGS84, LON_DD_WGS84 in session.query(Site.SITE_NAME, Site.LAT_DD_WGS84, Site.LON_DD_WGS84):
        locations_all.append({'SITE_NAME': SITE_NAME, 'LAT_DD_WGS84': LAT_DD_WGS84,'LON_DD_WGS84': LON_DD_WGS84})
    return locations_all



Site.M_Result, Site.M_Error, Site.M_WT_Result, Site.M_PH_Result, Site.M_DIS_Result, Site.M_TUR_Result, Site.M_DS_Rain, Site.M_Temp, Site.N, Site.E_STD, Site.R2, Site.R22, Site.PARM_INTERCIP, Site.tSTAT_INTERCIP, Site.PARM_WT, Site.tSTAT_WT, Site.PARM_PH, Site.tSTAT_PH, Site.PARM_DIS, Site.tSTAT_DIS, Site.PARM_TUR, Site.tSTAT_TUR, Site.PARM_DS_Rain, Site.tSTAT_DS_Rain, Site.PARM_AMB_TEMP, Site.tSTAT_AMB_TEMP
def retreave_standard(sel_loc):

    # return session.query().filter_by(Site.SITE_NAME = sel_loc).one()
    return session.query(Site).filter_by(SITE_NAME = sel_loc).all()
print(retreave_standard("Barton Spring Pool @ Downstream Dam"))
